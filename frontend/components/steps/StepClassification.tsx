'use client';

import { useEffect, useState } from 'react';
import { EmploymentType } from '@/types';
import { api } from '@/lib/api';
import clsx from 'clsx';

interface Question {
  id: number;
  question_key: string;
  question_text: string;
  help_text: string | null;
  question_type: string;
  stream: string | null;
  sort_order: number;
  answers: Array<{
    id: number;
    answer_key: string;
    answer_text: string;
    sort_order: number;
  }>;
}

interface ClassificationResult {
  level: number | null;
  stream: string | null;
  classification: {
    id: number;
    title: string;
    description: string;
    duties: string[];
    indicative_tasks: string[];
    base_rate?: number;
    level: number;
    stream: string;
    rate_effective_date?: string;
  } | null;
  rationale: string | null;
  confidence: string;
}

interface Props {
  employmentType: EmploymentType;
  age: number | null;
  answers: Record<string, string>;
  onAnswersChange: (answers: Record<string, string>) => void;
  onResult: (result: ClassificationResult) => void;
  onNext: () => void;
  onBack: () => void;
}

const STREAM_LABELS: Record<string, string> = {
  food_beverage: 'Food & Beverage',
  kitchen: 'Kitchen',
  front_office: 'Front Office',
  general: 'General',
};

export default function StepClassification({ employmentType, age, answers, onAnswersChange, onResult, onNext, onBack }: Props) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [classifying, setClassifying] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getQuestions()
      .then((data: unknown) => setQuestions(data as Question[]))
      .catch(() => setError('Could not load questions. Please check your connection.'))
      .finally(() => setLoading(false));
  }, []);

  const selectedStream = answers.stream;

  // Determine which questions to show based on current answers
  const visibleQuestions = questions.filter(q => {
    if (q.question_key === 'stream') return true;
    if (!selectedStream) return false;
    if (q.stream === null) return true;  // applies to all streams
    return q.stream === selectedStream;
  });

  function handleAnswer(questionKey: string, answerKey: string) {
    const newAnswers = { ...answers, [questionKey]: answerKey };
    // If stream changes, clear stream-specific answers
    if (questionKey === 'stream') {
      const keysToReset = Object.keys(newAnswers).filter(k =>
        k !== 'stream' && k !== 'experience'
      );
      keysToReset.forEach(k => delete newAnswers[k]);
    }
    onAnswersChange(newAnswers);
    setResult(null);
  }

  async function handleClassify() {
    setClassifying(true);
    setError(null);
    try {
      const res = await api.classify(answers, employmentType) as ClassificationResult;
      setResult(res);
      onResult(res);
    } catch {
      setError('Could not determine classification. Please try again.');
    } finally {
      setClassifying(false);
    }
  }

  // Check if enough questions are answered to classify
  const streamQuestions = visibleQuestions.filter(q => q.question_key !== 'stream');
  const answeredStreamQuestions = streamQuestions.filter(q => answers[q.question_key]);
  const canClassify = selectedStream && streamQuestions.length > 0 &&
    answeredStreamQuestions.length >= Math.min(streamQuestions.length, 2);

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading...</div>;
  }

  if (error && !questions.length) {
    return (
      <div className="danger-box">
        <p>{error}</p>
        <button onClick={onBack} className="btn-ghost mt-4">← Go back</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">What do you do at work?</h2>
        <p className="text-gray-600">
          Answer these questions about your job. We'll use your answers to figure out your{' '}
          <strong>classification level</strong> under the award — which determines your minimum pay rate.
        </p>
      </div>

      <div className="space-y-6">
        {visibleQuestions.map(question => (
          <div key={question.question_key} className="space-y-3">
            <div>
              <p className="font-semibold text-gray-900">{question.question_text}</p>
              {question.help_text && (
                <p className="text-sm text-gray-500 mt-1">{question.help_text}</p>
              )}
            </div>
            <div className="space-y-2">
              {question.answers.map(answer => (
                <button
                  key={answer.answer_key}
                  onClick={() => handleAnswer(question.question_key, answer.answer_key)}
                  className={clsx(
                    'w-full text-left px-4 py-3 rounded-lg border-2 transition-all text-sm',
                    answers[question.question_key] === answer.answer_key
                      ? 'border-brand-600 bg-brand-50 text-brand-900 font-medium'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  )}
                >
                  {answers[question.question_key] === answer.answer_key && (
                    <span className="mr-2">✓</span>
                  )}
                  {answer.answer_text}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Classify button */}
      {canClassify && !result && (
        <div className="pt-2">
          <button
            onClick={handleClassify}
            disabled={classifying}
            className="btn-primary w-full"
          >
            {classifying ? 'Working it out...' : 'Work out my classification →'}
          </button>
          {error && <p className="text-danger-500 text-sm mt-2">{error}</p>}
        </div>
      )}

      {/* Classification result */}
      {result && result.classification && (
        <div className="space-y-4">
          <div className="card border-brand-200 bg-brand-50 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-600 bg-brand-100 px-2 py-1 rounded">
                  {STREAM_LABELS[result.stream || ''] || result.stream} — Level {result.level}
                </span>
                {result.confidence === 'high' && (
                  <span className="text-xs text-success-600 font-medium">High confidence</span>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{result.classification.title}</h3>
            </div>

            <p className="text-gray-700">{result.classification.description}</p>

            {result.classification.duties && result.classification.duties.length > 0 && (
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-2">Typical duties at this level:</p>
                <ul className="space-y-1">
                  {result.classification.duties.slice(0, 5).map((duty, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-brand-500 mt-0.5 shrink-0">•</span>
                      {duty}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.classification.base_rate && (() => {
              const JUNIOR: Record<number, number> = { 15: 0.40, 16: 0.50, 17: 0.60, 18: 0.70, 19: 0.80, 20: 0.90 };
              const juniorMult = (age && age < 21) ? (JUNIOR[age] ?? 1.0) : 1.0;
              const displayRate = Number(result.classification.base_rate) * juniorMult;
              const effectiveDate = result.classification.rate_effective_date
                ? new Date(result.classification.rate_effective_date).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
                : '1 July 2025';
              return (
                <div className="bg-white rounded-lg p-4 border border-brand-200 space-y-1">
                  <p className="text-sm text-gray-600">Your minimum hourly rate</p>
                  <p className="text-3xl font-bold text-gray-900">
                    ${displayRate.toFixed(2)}
                    <span className="text-lg text-gray-500 font-normal">/hr</span>
                  </p>
                  {employmentType === 'casual' && (
                    <p className="text-sm text-gray-500">Includes the 25% casual loading (base: ${(Number(result.classification.base_rate) / 1.25 * juniorMult).toFixed(2)}/hr + 25%).</p>
                  )}
                  {juniorMult < 1.0 && (
                    <p className="text-sm text-warning-700">
                      Junior rate applied: {Math.round(juniorMult * 100)}% of adult rate (${Number(result.classification.base_rate).toFixed(2)}/hr).
                    </p>
                  )}
                  <p className="text-xs text-gray-400">Effective {effectiveDate} — verify at fairwork.gov.au</p>
                </div>
              );
            })()}
          </div>

          <div className="warning-box text-sm space-y-2">
            <p>
              <strong>Important:</strong> This is based on what you've told us about your actual duties.
              The level on your contract or payslip might be different.
            </p>
            <p>
              If your employer has classified you at a <em>lower</em> level than your duties suggest,
              you may be owed back pay at the higher rate. This is worth raising with the Fair Work Ombudsman.
            </p>
            {result.confidence !== 'high' && (
              <p>
                We weren't completely certain about your level — the result above is our best estimate.
                If it doesn't sound right, try adjusting your answers above.
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button onClick={onBack} className="btn-secondary flex-1">
              ← Back
            </button>
            <button onClick={onNext} className="btn-primary flex-1">
              Next — Enter your shifts →
            </button>
          </div>
        </div>
      )}

      {!result && (
        <div className="flex gap-3 pt-2">
          <button onClick={onBack} className="btn-ghost">← Back</button>
        </div>
      )}
    </div>
  );
}
