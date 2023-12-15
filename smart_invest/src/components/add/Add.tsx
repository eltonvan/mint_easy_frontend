// not in use


import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./add.scss";
import { GridColDef } from '@mui/x-data-grid';

type Props = {
    slug: string;
    columns: GridColDef[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;

};

const Add = (props: Props) => {

    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: () => {
        // const newId = uuidv4();
        return fetch(`http://localhost:8800/api/${props.slug}s`, {
          method: "post",
            headers: {
                accept: "application/json",
            },
            body: JSON.stringify({
                id: 1234,
                img:"",
                lastName: "Doe",
                firstName: "John",
                email: "test@testing.com",
                phone: "123456789",
                createdAt: "2021-09-01T12:00:00.000Z",
                verified: true,
            }),
        });
      },
      onSuccess: ()=>{
        queryClient.invalidateQueries([`all${props.slug}s`]);
      }
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // add new item to the list
        mutation.mutate();
    };
  return (
    <div className="add">
        <div className="modal">
            <span className="close" onClick={()=>props.setOpen(false)}>x</span>
            <h1>Add new {props.slug}</h1>
            <form onSubmit={handleSubmit}>
                {props.columns
                .filter((item)=>item.field !== "id" && item.field !== "img")
                .map((column) => (
                    <div className="item">
                        <label>{column.headerName}</label>
                        <input type={column.type} placeholder={column.field} />
                        </div>
                        
                       )) }
                       <button>Send</button>


            </form>
        </div>
    </div>
  );
};

export default Add;

