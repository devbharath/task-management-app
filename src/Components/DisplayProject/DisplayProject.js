import React from 'react'
import style from "../Global CSS/style.css";
import Select from "react-select";


const DisplayProject = (p) => {
    const {setDataToSend, DataToSend}=p
  return (<>
            <div className='name'>
                <div>
                    <span className='label'>Project Name:</span>
                    <input type='text' value={DataToSend.projectname} onChange={(e)=>setDataToSend({...DataToSend,projectname:e.target.value})}/>
                </div>
            </div>
            <div className='dates'>
            <div>
                    <span className='label'>Project Start Date:</span>
                    <input type='date' value={DataToSend.projectstart} onChange={(e)=>setDataToSend({...DataToSend,projectstart:e.target.value})}/>
                </div>
                <div>
                    <span className='label'>Project End Date:</span>
                    <input type='date' value={DataToSend.projectend} onChange={(e)=>setDataToSend({...DataToSend,projectend:e.target.value})}/>
                </div>
            </div>
            <div>
                <div>
                    <div className='label' style={{width:"100%"}}>A short description of the project:</div>
                    <div><textarea className="longInput" cols="30" rows="10" value={DataToSend.description } onChange={(e)=>setDataToSend({...DataToSend,description:e.target.value})}></textarea></div>
                </div>
               
            </div>
            <div>
                <div>
                <div className='label'>Set project status:</div>
                    <Select
                onChange={(e)=>setDataToSend({...DataToSend,projectstatus:e.value})}
                options={[{value:'Active',label:'Active'}, {value:'On Hold',label:'On Hold'},{value:'Completed',label:'Completed'},{value:'To be scheduled',label:'To be scheduled'},]}
                placeholder="Select Status"
                />
                </div>
            
                
            </div>
            </>
    
  )
}

export default DisplayProject