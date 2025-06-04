import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';

// Lazy load sub-tools
const MergePdf = lazy(() => import('./MergePdf'));
const CompressPdf = lazy(() => import('./CompressPdf'));

const PdfTools = () => (
  <div className="pdf-tools-container">
    <Suspense fallback={<LoadingSpinner />}>
      <Switch>
        <Route path="/pdf/merge" component={MergePdf} />
        <Route path="/pdf/compress" component={CompressPdf} />
      </Switch>
    </Suspense>
  </div>
);

export default PdfTools;