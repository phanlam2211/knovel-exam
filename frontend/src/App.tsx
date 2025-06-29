import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider, App as AntdApp } from 'antd';
import theme from './theme';

import './App.css';
import SignIn from './pages/sign-in';
import ManageTasks from './pages/manage-tasks';
import EmployeeTaskSummary from './pages/employee-task-summary';
import ManageEmployees from './pages/manage-employees';
import { PrivateRouteWrapper } from './hocs/private-route-wrapper';

function App() {
  return (
    <ConfigProvider theme={theme}>
      <AntdApp>
        <Router>
          <div className='App'>
            <main>
              <Routes>
                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/unauthorized' element={<div style={{textAlign:'center',marginTop:40,fontSize:24,color:'#ff4d4f'}}>Access Denied</div>} />
                <Route element={<PrivateRouteWrapper allowedRoles={['EMPLOYER']} />}> 
                  <Route path='/employee-task-summary' element={<EmployeeTaskSummary />} />
                  <Route path='/manage-employees' element={<ManageEmployees />} />
                </Route>
                <Route path='/manage-tasks' element={<ManageTasks />} />
                <Route path='/' element={<ManageTasks />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
