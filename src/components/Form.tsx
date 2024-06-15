import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { FormEvent, useRef, useState } from "react";

// interface FormData{
//     name:string
//     age:number
// }

const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  age: z
    .number({ invalid_type_error: "Age field is required" })
    .min(18, { message: "Age must be at least 18" }),
});

type FormData = z.infer<typeof schema>;

function Form() {
  // const nameRef = useRef<HTMLInputElement>(null)
  // const ageRef = useRef<HTMLInputElement>(null)
  // const person = {name:'',age:0}

  //   const [person, setPerson] = useState({
  //     name: "",
  //     age: '',
  //   });

  //   const handleSubmit = (e: FormEvent) => {
  //     e.preventDefault();
  //     // if(nameRef.current && ageRef.current ){
  //     //     person.name = nameRef.current.value
  //     //     person.age  = +ageRef.current.value
  //     //     console.log(person);

  //     // }

  //     console.log(person);
  //   };

  const {
    register,
    handleSubmit,
    formState: { errors,isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          id="name"
          {...register("name")}
          //   onChange={(e) => setPerson({ ...person, name: e.target.value })}
          //   value={person.name}
          type="text"
          className="form-control"
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          id="age"
          {...register("age", { valueAsNumber: true })}
          //   value={person.age}
          //   onChange={(e) => setPerson({ ...person, age: e.target.value })}
          type="number"
          className="form-control"
        />
        {errors.age && <p className="text-danger">{errors.age.message}</p>}
      </div>
      <button type="submit" disabled={!isValid} className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default Form;
