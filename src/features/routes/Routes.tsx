import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Paths } from '../../enums/paths';

const Cats = React.lazy(() => import('../cats/Cats'));
const Upload = React.lazy(() => import('../upload/Upload'));

const AppRoutes = () => {
    return (
        <Suspense fallback={<></>}>
            <Routes>
                <Route path={Paths.home} element={<Cats />} />
                <Route path={Paths.upload} element={<Upload />} />
                <Route path={Paths.error} element={<p>No cat found</p>} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
