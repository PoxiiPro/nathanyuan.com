import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../hooks/useLanguage';
import '../assets/styles/DemoPage.css';

const SVG_PADDING = 20;

// A short curated list of popular Yahoo Finance tickers for the user to choose from.
// TODO: Replace with a backend endpoint or a hosted static list that contains the
// full set of Yahoo Finance tickers (and symbols like BRK.B) to support a complete search.
const TICKER_SUGGESTIONS = [
  'AAPL', 'MSFT', 'GOOGL', 'GOOG', 'AMZN', 'TSLA', 'NVDA', 'META', 'NFLX', 'BRK.B', 'V', 'JPM', 'BAC', 'INTC', 'AMD', 'ORCL', 'IBM', 'DIS', 'SBUX', 'SHOP'
];

// Demo JSON data (hardcoded for now). Dates are ISO strings and prices are floats.
const DEMO_JSON = (() => {
  const n = 90;
  const dates: string[] = [];
  const prices: number[] = [];
  const today = new Date();
  // deterministic seed-ish values for demo
  let base = 120;
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(d.toISOString().slice(0, 10));
    // simple walk + seasonal
    base = Math.max(5, base + Math.sin(i / 8) * 0.7 + (i % 5 - 2) * 0.3);
    prices.push(parseFloat(base.toFixed(2)));
  }
  return { dates, prices };
})();

/**
 * Validate ticker against a permissive pattern compatible with common Yahoo Finance tickers.
 * Allows letters, numbers, dots and dashes, up to 10 characters.
 */
function isValidTicker(ticker: string) {
  return /^[A-Za-z0-9.\-]{1,10}$/.test((ticker || '').trim());
}

/**
 * Generate deterministic mock historical data for the last ~1 year (365 points).
 * This is only for frontend visualization while backend is not hooked up.
 */
function generateMockHistory(seed: string) {
  const days = 365;
  const data: number[] = [];
  let base = 100 + (seed ? seed.split('').reduce((s, c) => s + c.charCodeAt(0), 0) % 50 : 100);
  for (let i = 0; i < days; i++) {
    const seasonal = Math.sin((i / days) * Math.PI * 4) * (5 + (i % 7));
    const noise = (Math.random() - 0.5) * 2;
    base = Math.max(1, base + seasonal * 0.02 + noise * 0.1);
    data.push(parseFloat((base + Math.sin(i / 12) * 2).toFixed(2)));
  }
  return data;
}

// Lazy plot wrapper that dynamically imports react-plotly.js at runtime if available.
const PlotWrapper: React.FC<{ dates: string[]; prices: number[]; predicted?: { daysAhead: number; value: number } | null }> = ({ dates, prices, predicted }) => {
  const [PlotComponent, setPlotComponent] = useState<any | null>(null);

  useEffect(() => {
    let mounted = true;
    // @ts-ignore: optional runtime dependency
    import('react-plotly.js').then((mod) => {
      if (mounted) setPlotComponent(() => mod.default || mod);
    }).catch(() => setPlotComponent(null));
    return () => { mounted = false; };
  }, []);

  if (!PlotComponent) {
    // Fallback to simple SVG chart when react-plotly isn't installed
    return <StockChart data={prices} predicted={predicted} />;
  }

  const trace: any = {
    x: dates,
    y: prices,
    type: 'scatter',
    mode: 'lines',
    line: { color: '#60a5fa' },
    hoverinfo: 'x+y'
  };

  const layout = {
    autosize: true,
    margin: { l: 40, r: 20, t: 20, b: 40 },
    xaxis: { title: 'Date', rangeslider: { visible: true }, type: 'date' },
    yaxis: { title: 'Price (USD)' }
  } as any;

  const config = { responsive: true, displayModeBar: true };

  return <PlotComponent data={[trace]} layout={layout} config={config} style={{ width: '100%', height: '100%' }} />;
};

// Simple SVG line chart (fallback when Plotly not available)
const StockChart: React.FC<{ data: number[]; predicted?: { daysAhead: number; value: number } | null }> = ({ data, predicted }) => {
  const width = Math.min(1200, window.innerWidth * 0.85);
  const height = Math.max(200, window.innerHeight * 0.4);

  const min = Math.min(...data, predicted ? predicted.value : Infinity);
  const max = Math.max(...data, predicted ? predicted.value : -Infinity);
  const range = max - min || 1;

  const scaleX = (i: number) => SVG_PADDING + (i / (data.length - 1)) * (width - SVG_PADDING * 2);
  const scaleY = (v: number) => height - SVG_PADDING - ((v - min) / range) * (height - SVG_PADDING * 2);

  const path = data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(v)}`).join(' ');

  return (
    <div className="stock-chart">
      <svg width={width} height={height}>
        {/* grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={SVG_PADDING}
            x2={width - SVG_PADDING}
            y1={SVG_PADDING + t * (height - SVG_PADDING * 2)}
            y2={SVG_PADDING + t * (height - SVG_PADDING * 2)}
            stroke="#2b2b2b"
            strokeOpacity={0.15}
          />
        ))}
        {/* price path */}
        <path d={path} fill="none" stroke="#60a5fa" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        {/* predicted point */}
        {predicted ? (
          (() => {
            const predictedIndex = data.length - 1 + predicted.daysAhead; // plot after last
            const x = scaleX(Math.min(data.length - 1, data.length - 1)) + (predicted.daysAhead / 30) * 60; // small offset
            const y = scaleY(predicted.value);
            return (
              <g>
                <line x1={scaleX(data.length - 1)} y1={scaleY(data[data.length - 1])} x2={x} y2={y} stroke="#f97316" strokeDasharray="4 4" strokeWidth={1.5} />
                <circle cx={x} cy={y} r={5} fill="#f97316" />
              </g>
            );
          })()
        ) : null}
      </svg>
    </div>
  );
};

const DemoPage: React.FC = () => {
  const { translations } = useLanguage();
  // demoPage translations may not be present in the Translation type; use a local any-cast
  const dm = (translations as any).demoPage || {};

  const [ticker, setTicker] = useState('AAPL');
  const [daysAhead, setDaysAhead] = useState(1);
  const [modelType, setModelType] = useState<string>(() => (dm.modelOptions && Object.keys(dm.modelOptions)[0]) || 'linear');
  const [history, setHistory] = useState<number[]>(() => generateMockHistory('AAPL'));
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // regenerate mock history when ticker changes (visual only)
    setHistory(generateMockHistory(ticker));
  }, [ticker]);

  const handlePredict = async () => {
    setError(null);
    if (!isValidTicker(ticker)) {
      setError(dm.errorInvalidTicker || translations.common.errorMessage || 'Invalid ticker');
      return;
    }

    setLoading(true);
    try {
      // TODO: replace mock prediction with backend call
      // Example TODO: const resp = await axios.post('/api/predict', { ticker, daysAhead, modelType });
      // setPrediction(resp.data.predictedPrice);

      // Mock prediction: use last price + a small drift proportional to daysAhead
      // slight modelType variation can be added here; for now linear uses base drift
      const last = history[history.length - 1] || 100;
      const modelMultiplier = modelType === 'linear' ? 1 : 1; // placeholder if more models added
      const mock = parseFloat((last * (1 + (daysAhead * 0.002 * modelMultiplier) + (Math.random() - 0.5) * 0.01)).toFixed(2));
      // small delay to simulate network
      await new Promise((r) => setTimeout(r, 600));
      setPrediction(mock);
    } catch (err) {
      setError(translations.common.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const predictedPoint = useMemo(() => (prediction ? { daysAhead, value: prediction } : null), [prediction, daysAhead]);

  return (
    <>
      <Helmet>
        <title>Nathan Yuan - Live Demo | Interactive Portfolio</title>
        <meta name="description" content="Experience Nathan Yuan's live project demos. Interactive demonstrations of web applications and AI integrations." />
        <meta name="keywords" content="Nathan Yuan, demo, live project, interactive, portfolio, AI demo, web app demo" />
        <meta property="og:title" content="Nathan Yuan - Live Demo" />
        <meta property="og:description" content="Try out Nathan Yuan's live project demonstrations." />
        <meta property="og:url" content="https://nathanyuan.com/demo" />
        <link rel="canonical" href="https://nathanyuan.com/demo" />
      </Helmet>
      <section id="demo" className="demo-page">
        <div className="container">
          <div className="page-content">
            <h1>{translations.nav.demo}</h1>
            <div className="demo-content">
              <div className="demo-card">
                <h2 className="demo-title">{dm.title}</h2>

                <div className="controls-row">
                  <div className="demo-section">
                    <label className="demo-section-title" htmlFor="ticker-select">{dm.tickerLabel}</label>
                    <select
                      id="ticker-select"
                      className="demo-select"
                      value={ticker}
                      onChange={(e) => setTicker(e.target.value)}
                      aria-label={dm.tickerLabel}
                    >
                      {TICKER_SUGGESTIONS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <p className="helper-note">{dm.supportedFormatNote}</p>
                  </div>

                  <div className="demo-section">
                    <label className="demo-section-title" htmlFor="days-select">{dm.daysLabel}</label>
                    <select
                      id="days-select"
                      className="demo-select"
                      value={daysAhead}
                      onChange={(e) => setDaysAhead(Number(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                        <option key={d} value={d}>{d} {dm.daysSuffix}</option>
                      ))}
                    </select>
                  </div>

                  <div className="demo-section">
                    <label className="demo-section-title" htmlFor="model-select">{dm.modelLabel}</label>
                    <select
                      id="model-select"
                      className="demo-select"
                      value={modelType}
                      onChange={(e) => setModelType(e.target.value)}
                    >
                      {Object.entries(dm.modelOptions || { linear: 'Linear Regression' }).map(([key, label]) => (
                        <option key={key} value={key}>{label as string}</option>
                      ))}
                    </select>
                    <p className="helper-note">{dm.modelNote}</p>
                  </div>
                </div>

                <div className="demo-section">
                  <button className="predict-button" onClick={handlePredict} disabled={loading}>
                    {loading ? dm.predictionLoading : dm.predictButton}
                  </button>
                </div>

                {error ? <p className="error-text">{error}</p> : null}

                <div className="demo-section">
                  <h3 className="demo-section-title">{dm.historicalLabel}</h3>
                  <p className="demo-section-content">{dm.historicalDescription}</p>
                  <div ref={chartRef} className="chart-container">
                    {/* Use PlotWrapper with DEMO_JSON for the demo */}
                    <PlotWrapper dates={DEMO_JSON.dates} prices={DEMO_JSON.prices} predicted={predictedPoint} />
                  </div>
                </div>

                <div className="demo-section">
                  <h3 className="demo-section-title">{dm.predictionLabel}</h3>
                  <p className="demo-section-content">
                    {prediction ? (
                      <>
                        {dm.predictedTextPrefix} <strong>${prediction}</strong> {`(${daysAhead} ${dm.daysSuffix})`}
                      </>
                    ) : (
                      dm.noPredictionText
                    )}
                  </p>
                </div>

                <div className="demo-section">
                  <p className="small-muted">{dm.backendTodo}</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DemoPage;
