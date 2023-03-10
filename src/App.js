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
import LandingPage from './components/LandingPage'
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

function App() {
  useTitle('FYP')
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<LandingPage />} />

        <Route path='401' element={<NotAuthorized />} />

        <Route path='login' element={<Login />} />

        <Route path='auth' element={<PersistLogin />}>
          <Route index element={<AuthType />} />
        </Route>

        {/* Protected Route */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
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
                </Route>
              </Route>
              {/* End Supervisor Supervisor */}
            </Route>
          </Route>
        </Route>

        {/* End Protected Routes */}
      </Route>
    </Routes>
  )
}

export default App
