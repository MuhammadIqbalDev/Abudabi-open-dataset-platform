import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import RealTimeApisDetail from "../pages/RealTimeApisDetail";
import { routes } from "./helper";

const Home = lazy(() => import('../pages/Home'))
const RashidIntro = lazy(() => import("../pages/ChatGPT/IntroductionPage"));
const Dataset = lazy(() => import('../pages/Dataset'))
const DatasetDetail = lazy(() => import('../pages/DatasetDetail'))
const About = lazy(() => import('../pages/About'))
const Applications = lazy(() => import('../pages/Applications'))
const Publishers = lazy(() => import('../pages/Publisher'))
const ChatGPT = lazy(() => import('../pages/ChatGPT'))
const DemoChatGPT = lazy(() => import('../pages/DemoChatGPT'))
const Support = lazy(() => import('../pages/Support'))
const SupportQuestions = lazy(() => import('../pages/SupportQuestions'))
const SupportQuestionsDetail = lazy(() => import('../pages/SupportQuestionsDetail'))
// const Register = lazy(() => import('../pages/Authentication/Register'))
const Login = lazy(() => import('../pages/Authentication/Login'))
const RecoverPassword = lazy(() => import('../pages/Authentication/RecoverPassword'))
const ResetPassword = lazy(() => import('../pages/Authentication/ResetPassword'))
const OTP = lazy(() => import('../pages/Authentication/OTP'))
// const SuccessStories = lazy(() => import('../pages/SuccessStories'))
// const SuccessStoriesDetail = lazy(() => import('../pages/SuccessStoriesDetail'))
const PrivacyPolicy = lazy(() => import('../pages/Authentication/PrivacyPolicy'))
const Terms = lazy(() => import('../pages/Authentication/Terms'))
const License = lazy(() => import('../pages/License'))
const ChangePassword = lazy(() => import('../pages/Authentication/ChangePassword'))
const ContactUs = lazy(() => import('../pages/ContactUs'))
const RealTimeApis = lazy(() => import('../pages/RealTimeApis'))
const Reports = lazy(() => import('../pages/Reports'))
const InsightsReports = lazy(() => import('../pages/Reports/Insights'))
const PublishersReports = lazy(() => import('../pages/Reports/Publishers'))
const DatasetsReports = lazy(() => import('../pages/Reports/Datasets'))
const Confirmation = lazy(() => import('../pages/Confirmation'))
const Unauthorized = lazy(() => import('../pages/Error/Unauthorized'))
const NotFound = lazy(() => import('../pages/Error/NotFound'))

const Router = () => {

    const { isLoggedIn } = useSelector(state => state.authentication);

    return (
      <Routes>
        <Route
          path={"/"}
          element={<Navigate to={routes.HOME} replace={true} />}
        />
        <Route path={routes.HOME} element={<Home />} />
        <Route path={routes.DATASET} element={<Dataset />} />
        <Route path={routes.DATASET_DETAIL} element={<DatasetDetail />} />
        <Route path={routes.APPLICATIONS} element={<Applications />} />
        <Route path={routes.PUBLISHER} element={<Publishers />} />
        <Route path={routes.CHATGPT} element={<ChatGPT />} />
        <Route path={routes.DEMOCHATGPT} element={<DemoChatGPT />} />
        <Route path={routes.RASHIDINTRO} element={<RashidIntro />} />
        <Route path={routes.SUPPORT} element={<Support />} />
        <Route path={routes.SUPPORT_QUESTIONS} element={<SupportQuestions />} />
        <Route
          path={routes.SUPPORT_QUESTIONS_DETAIL}
          element={<SupportQuestionsDetail />}
        />
        <Route path={routes.ABOUTUS} element={<About />} />
        {/* <Route path={routes.REGISTER} element={!isLoggedIn ? <Register /> : <Unauthorized title={"resetTitle"} />} /> */}
        <Route
          path={routes.LOGIN}
          element={
            !isLoggedIn ? <Login /> : <Unauthorized title={"loginTitle"} />
          }
        />
        <Route
          path={routes.RECOVER}
          element={
            !isLoggedIn ? (
              <RecoverPassword />
            ) : (
              <Unauthorized title={"resetTitle"} />
            )
          }
        />
        <Route
          path={routes.RESET}
          element={
            !isLoggedIn ? (
              <ResetPassword />
            ) : (
              <Unauthorized title={"resetTitle"} />
            )
          }
        />
        <Route
          path={routes.OTP}
          element={
            !isLoggedIn ? <OTP /> : <Unauthorized title={"resetTitle"} />
          }
        />
        {/* <Route path={routes.SUCCESS_STOIRES} element={<SuccessStories />} />
            <Route path={routes.SUCCESS_STOIRES_DETAIL} element={<SuccessStoriesDetail />} /> */}
        <Route path={routes.POLICY} element={<PrivacyPolicy />} />
        <Route path={routes.TERMS} element={<Terms />} />
        <Route path={routes.LICENSE} element={<License />} />
        <Route path={routes.CHANGE} element={<ChangePassword />} />
        <Route path={routes.CONTACT} element={<ContactUs />} />
        <Route path={routes.REAL_TIME_APIS} element={<RealTimeApis />} />
        <Route
          path={routes.REAL_TIME_APIS_DETAIL}
          element={<RealTimeApisDetail />}
        />
        <Route path={routes.CONFIRMATION} element={<Confirmation />} />
        <Route
          path={routes.REPORTS}
          element={isLoggedIn ? <Reports /> : <Unauthorized />}
        />
        <Route
          path={routes.REPORTS_INSIGHTS}
          element={isLoggedIn ? <InsightsReports /> : <Unauthorized />}
        />
        <Route
          path={routes.REPORTS_PUBLISHERS}
          element={isLoggedIn ? <PublishersReports /> : <Unauthorized />}
        />
        <Route
          path={routes.REPORTS_DATASETS}
          element={isLoggedIn ? <DatasetsReports /> : <Unauthorized />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
};

export default Router;