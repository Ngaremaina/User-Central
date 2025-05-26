import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateTaskForm from '../pages/CreateTasks';
import AddDepartment from '../pages/AddDepartment';
import Dashboard from '../pages/Dashboard';
import ManagerDashboard from '../pages/ManagerDashBoard';
import { AuthContext } from '../context/Authentication';
import UpdateUserForm from '../pages/UpdateUser';
import UpdateDepartmentForm from '../pages/UpdateDepartment';
import UpdateTaskForm from '../pages/UpdateTasks';
import UserForm from '../pages/AddUsers';
import { useGlobalContext } from '../context/GlobalContext';


const App: React.FC = () => {
  const {userData} = useContext(AuthContext)
  const {departments} = useGlobalContext()

  return (
    <>           
        <Routes>
          <Route
            path="/dashboard"
            element={userData ? <Dashboard /> : <p>Loading...</p>}
          />
          <Route
            path="/manager-dashboard"
            element={userData ? <ManagerDashboard departments = {departments}/> : <p>Loading...</p>}
          />
        
            <Route path="/manager-departments" element = {<AddDepartment departments = {departments}/>}></Route>
            <Route path="/manager-users" element = {<UserForm departments = {departments} />}></Route>
            <Route path="/manager-tasks" element = {<CreateTaskForm departments = {departments}/>}></Route>
            <Route path="/update user/:id" element = {<UpdateUserForm departments = {departments}/>} ></Route>
            <Route path="/update department/:id" element = {<UpdateDepartmentForm departments = {departments}/>} ></Route>
            <Route path="/update tasks/:id" element = {<UpdateTaskForm departments = {departments}/>} ></Route>
    
          
        </Routes>

        </>
  );
};

export default App;
