import './SelectListTree.css'
import { TfiViewList } from "react-icons/tfi";
import { MdTableChart } from "react-icons/md";
import { Link } from 'react-router-dom';


export default function SelectListTree({listTree, changeView}) {
  return (
    <Link to={`${listTree !== true ? "currencies" : "/"}`} > 
        <div className='viewDiv' onClick={()=>changeView()}>
          <div className='flex items-center gap-2'>
                {listTree === true ?<div className='flex gap-1'>View: <MdTableChart size={'25px'} /></div>  : 
                <div className='flex gap-1 items-center'>View: <TfiViewList size={"25px"} /></div>}
          </div>
        </div>
    </Link>
  )
}
