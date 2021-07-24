/* Main Component Sidebar */
/* Dependencies */
import React from 'react'
/* Components */
import NewProyect from '../proyects/NewProyect';
import ListProyects from '../proyects/ListProyects';
/* Component */
const Sidebar = () => {
  return (
    <aside>
      <h1>Task<span>Manager</span></h1>
      <NewProyect />
      <div className="proyectos">
        <h2>Your Proyects</h2>
        <ListProyects />
      </div>
    </aside>
  );
}
 
export default Sidebar;