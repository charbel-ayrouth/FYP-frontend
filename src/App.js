import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './features/auth/Login'
import DashLayout from './components/Admin/DashLayout'
import Welcome from './components/Admin/Welcome'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import Prefetch from './features/auth/Prefetch'
import LandingPage from './components/Landing Page/LandingPage'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'
import useTitle from './hooks/useTitle'
import TopicsList from './features/topics/TopicsList'
import EditTopic from './features/topics/EditTopic'
import NewTopicForm from './features/topics/NewTopicForm'
import DomainsList from './features/domains/DomainsList'
import EditDomain from './features/domains/EditDomain'
import NewDomainForm from './features/domains/NewDomainForm'
import AuthType from './features/auth/AuthType'
import SupervisorLanding from './components/Supervisor/SupervisorLanding'
import NotAuthorized from './components/NotAuthorized'
import NotFound from './components/NotFound'
import AddTopics from './features/topics/Supervisor/AddTopics'
import AddDomains from './features/domains/Supervisor/AddDomains'
import NotificationsList from './features/notifications/NotificationsList'
import SupervisorsList from './features/supervisors/Student/SupervisorsList'
import StudentLanding from './components/Student/StudentLanding'
import Stepper from './components/Stepper/Stepper.jsx'
import ForgetPassword from './features/auth/ForgetPassword'
import ResetPassword from './features/auth/ResetPassword'
import AuthLayout from './components/AuthLayout'
import EditDomainsUser from './features/domains/Supervisor/EditDomainsUser'

function App() {
  useTitle('FYP')
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<LandingPage />} />

        <Route path='401' element={<NotAuthorized />} />

        <Route element={<AuthLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='forget-password' element={<ForgetPassword />} />
          <Route path='reset-password/:token' element={<ResetPassword />} />
        </Route>

        <Route element={<PersistLogin />}>
          <Route path='auth' element={<AuthType />} />
        </Route>

        {/* Protected Route */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              {/* Account Setup */}
              <Route element={<DashLayout />}>
                <Route path='account-setup' element={<Stepper />} />
              </Route>
              {/* Account Setup */}
              {/* Admin */}
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path='admin' element={<DashLayout />}>
                  <Route index element={<Welcome />} />

                  <Route path='users'>
                    <Route index element={<UsersList />} />
                    <Route path=':id' element={<EditUser />} />
                    <Route path='new' element={<NewUserForm />} />
                  </Route>

                  <Route path='topics'>
                    <Route index element={<TopicsList />} />
                    <Route path=':id' element={<EditTopic />} />
                    <Route path='new' element={<NewTopicForm />} />
                  </Route>

                  <Route path='domains'>
                    <Route index element={<DomainsList />} />
                    <Route path=':id' element={<EditDomain />} />
                    <Route path='new' element={<NewDomainForm />} />
                  </Route>
                </Route>
              </Route>
              {/* End Admin */}
              {/* Start Supervisor */}
              <Route
                element={<RequireAuth allowedRoles={[ROLES.Supervisor]} />}
              >
                <Route path='supervisor' element={<DashLayout />}>
                  <Route index element={<SupervisorLanding />} />

                  <Route path='topics' element={<AddTopics />} />
                  <Route path='domains' element={<AddDomains />} />
                  <Route path='notifications' element={<NotificationsList />} />
                </Route>
              </Route>
              {/* End Supervisor Supervisor */}

              {/* Start Student */}
              <Route element={<RequireAuth allowedRoles={[ROLES.Student]} />}>
                <Route path='student' element={<DashLayout />}>
                  <Route index element={<StudentLanding />} />

                  <Route path='connections' element={<SupervisorsList />} />
                  <Route path='topics' element={<AddTopics />} />
                  <Route path='domains' element={<AddDomains />} />
                  <Route path='notifications' element={<NotificationsList />} />
                </Route>
              </Route>
              {/* End Student */}
            </Route>
          </Route>
        </Route>
        {/* End Protected Routes */}

        {/* 404 */}
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
