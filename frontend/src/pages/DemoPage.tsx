import React, { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../hooks/useLanguage';
import axios from 'axios';
import '../assets/styles/DemoPage.css';

// List of ticker options for demo
const TICKER_SUGGESTIONS = [
  'AAPL', // Apple
  'MSFT', // Microsoft
  'AMZN', // Amazon
  'META', // Meta (Facebook)
  'NFLX', // Netflix
  'NVDA', // Nvidia
  'TSLA', // Tesla
  'AMD',  // AMD
  'PYPL', // PayPal
  'PLTR', // Palantir
];

// React.lazy + Suspense to code-split the Plotly chart component.
// This keeps the initial bundle small while still providing a standard interactive chart.
const Plot = React.lazy(() => import('react-plotly.js'));

const PlotWrapper: React.FC<{ dates: string[]; prices: number[]; predicted?: { daysAhead: number; value: number } | null; loading?: boolean }> = ({ dates, prices, predicted, loading = false }) => {
  // Show a chart-level loading state when data is being fetched from the backend.
  if (loading) {
    return (
      <div className="chart-loading chart-loading--large">Fetching data…</div>
    );
  }
  const data = [
    {
      x: dates,
      y: prices,
      type: 'scatter',
      mode: 'lines',
      line: { color: '#60a5fa' },
      hoverinfo: 'x+y'
    }
  ];

  const layout: any = {
    autosize: true,
    margin: { l: 40, r: 20, t: 20, b: 40 },
    xaxis: { title: 'Date', rangeslider: { visible: true }, type: 'date' },
    yaxis: { title: 'Price (USD)' }
  };

  const config = { responsive: true, displayModeBar: true };

  if (!dates || dates.length === 0 || !prices || prices.length === 0) {
    return <div className="chart-placeholder">No data to display. Run a prediction to populate the chart.</div>;
  }

  return (
    <div className="plot-wrapper">
      <Suspense fallback={<div className="chart-loading">Loading chart…</div>}>
        {/* @ts-ignore: react-plotly may not have typings in this project; cast at runtime */}
        {(Plot as any) && <Plot data={data} layout={layout} config={config} useResizeHandler style={{ width: '100%', height: '100%' }} />}
      </Suspense>
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
  // State for what is plotted: dates and prices. Backend will populate these.
  const [plotDates, setPlotDates] = useState<string[]>([]);
  const [plotPrices, setPlotPrices] = useState<number[]>([]);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chartRef = useRef<HTMLDivElement | null>(null);

  // Helpers for date generation
  function addDays(dateStr: string, days: number) {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }

  // Clear plotted series when ticker changes; backend should provide fresh data on predict
  useEffect(() => {
    setPlotDates([]);
    setPlotPrices([]);
    setPrediction(null);
    setError(null);
  }, [ticker]);

  const handlePredict = async () => {
    // Clear prior error and proceed; ticker is chosen from the curated dropdown.
    setError(null);

    setLoading(true);
    try {
      // Call backend prediction endpoint. Expecting either:
      // - { dates: [...], prices: [...] } OR
      // - { history: { dates: [...], prices: [...] } } OR
      // - { predicted: number | [numbers], predictedDates?: [...] }
      const payload = { ticker, daysAhead, modelType };
      const resp = await axios.post('/api/getPrediction', payload);
      const data = resp?.data || {};

      // If backend returned full series, replace plotted data
      if (data.dates && data.prices && Array.isArray(data.dates) && Array.isArray(data.prices)) {
        setPlotDates(data.dates.map((d: any) => String(d)));
        setPlotPrices(data.prices.map((p: any) => Number(p)));
        // Set prediction to last predicted value if provided separately
        if (data.predicted !== undefined) {
          const lastPred = Array.isArray(data.predicted) ? data.predicted[data.predicted.length - 1] : data.predicted;
          if (Number.isFinite(Number(lastPred))) setPrediction(parseFloat(Number(lastPred).toFixed(2)));
        }
      } else if (data.history && data.history.dates && data.history.prices) {
        setPlotDates(data.history.dates.map((d: any) => String(d)));
        setPlotPrices(data.history.prices.map((p: any) => Number(p)));
        if (data.history.predicted) {
          const lastPred = Array.isArray(data.history.predicted) ? data.history.predicted.slice(-1)[0] : data.history.predicted;
          if (Number.isFinite(Number(lastPred))) setPrediction(parseFloat(Number(lastPred).toFixed(2)));
        }
      } else if (data.predicted !== undefined) {
        // Append predicted values to current plotted series
        const preds = Array.isArray(data.predicted) ? data.predicted.map((v: any) => Number(v)) : [Number(data.predicted)];
        // optional explicit predictedDates
        const predDates = Array.isArray(data.predictedDates) ? data.predictedDates.map((d: any) => String(d)) : null;

        const lastDate = plotDates.length ? plotDates[plotDates.length - 1] : new Date().toISOString().slice(0, 10);
        const newDates = plotDates.slice();
        const newPrices = plotPrices.slice();
        if (predDates && predDates.length === preds.length) {
          preds.forEach((p: number, i: number) => {
            newDates.push(predDates[i]);
            newPrices.push(p);
          });
        } else {
          preds.forEach((p: number, i: number) => {
            newDates.push(addDays(lastDate, i + 1));
            newPrices.push(p);
          });
        }
        setPlotDates(newDates);
        setPlotPrices(newPrices);
        // set prediction to last appended
        const lastPred = preds[preds.length - 1];
        if (Number.isFinite(Number(lastPred))) setPrediction(parseFloat(Number(lastPred).toFixed(2)));
      } else if (data.predictedPrice !== undefined) {
        const p = Number(data.predictedPrice);
        if (!Number.isFinite(p)) throw new Error('Invalid predictedPrice');
        const lastDate = plotDates.length ? plotDates[plotDates.length - 1] : new Date().toISOString().slice(0, 10);
        const newDates = plotDates.slice();
        const newPrices = plotPrices.slice();
        newDates.push(addDays(lastDate, daysAhead || 1));
        newPrices.push(p);
        setPlotDates(newDates);
        setPlotPrices(newPrices);
        setPrediction(parseFloat(p.toFixed(2)));
      } else {
        throw new Error('No usable series or prediction returned from server');
      }
    } catch (err: any) {
      setError(err?.response?.data?.error || err?.message || translations.common.errorMessage);
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
                <p className="demo-subtitle">{dm.demoIntro}</p>

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
                    {/* removed supportedFormatNote per request */}
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
                    {/* removed modelNote per request */}
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
                    {/* Plot the current plotted series (updates when prediction runs) */}
                    <PlotWrapper dates={plotDates} prices={plotPrices} predicted={predictedPoint} loading={loading} />
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DemoPage;
