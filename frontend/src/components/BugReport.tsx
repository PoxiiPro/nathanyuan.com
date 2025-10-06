import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import '../assets/styles/BugReport.css';

interface BugReportProps {
  onClose: () => void;
}

interface BugReportForm {
  title: string;
  description: string;
  priority: 'p0' | 'p1' | 'p2' | 'p3';
}

const BugReport: React.FC<BugReportProps> = ({ onClose }) => {
  const { translations } = useLanguage();
  const [form, setForm] = useState<BugReportForm>({
    title: '',
    description: '',
    priority: 'p1'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (field: keyof BugReportForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  /**
   * Handles form submission by saving bug report data to the "BugTickets" table
   * @param e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const bugReportData = {
        title: form.title,
        desc: form.description,
        prio: form.priority.toUpperCase(),
      };

      const response = await fetch('/api/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          table: 'BugTickets',
          data: bugReportData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save bug report');
      }

      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Failed to submit bug report:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = form.title.trim() && form.description.trim();

  if (submitStatus === 'success') {
    return (
      <div className="bug-report-success">
        <i className="fas fa-check-circle"></i>
        <p>{translations.bugReport.success}</p>
      </div>
    );
  }

  if (submitStatus === 'error') {
    return (
      <div className="bug-report-error">
        <i className="fas fa-exclamation-triangle"></i>
        <p>{translations.bugReport.error}</p>
        <button 
          className="bug-report-retry-button"
          onClick={() => setSubmitStatus('idle')}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <form className="bug-report-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="bug-title" className="form-label">
          {translations.bugReport.form.titleLabel}
        </label>
        <input
          id="bug-title"
          type="text"
          className="form-input"
          placeholder={translations.bugReport.form.titlePlaceholder}
          value={form.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="bug-description" className="form-label">
          {translations.bugReport.form.descriptionLabel}
        </label>
        <textarea
          id="bug-description"
          className="form-textarea"
          rows={5}
          placeholder={translations.bugReport.form.descriptionPlaceholder}
          value={form.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="bug-priority" className="form-label">
          {translations.bugReport.form.priorityLabel}
        </label>
        <select
          id="bug-priority"
          className="form-select bug-priority-select"
          value={form.priority}
          onChange={(e) => handleInputChange('priority', e.target.value as 'p0' | 'p1' | 'p2' | 'p3')}
        >
          <option value="p0">{translations.bugReport.form.priorityOptions.p0}</option>
          <option value="p1">{translations.bugReport.form.priorityOptions.p1}</option>
          <option value="p2">{translations.bugReport.form.priorityOptions.p2}</option>
          <option value="p3">{translations.bugReport.form.priorityOptions.p3}</option>
        </select>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="form-button form-button-secondary"
          onClick={onClose}
        >
          {translations.bugReport.form.cancel}
        </button>
        <button
          type="submit"
          className="form-button form-button-primary"
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              {translations.common.loading}
            </>
          ) : (
            translations.bugReport.form.submit
          )}
        </button>
      </div>
    </form>
  );
};

export default BugReport;