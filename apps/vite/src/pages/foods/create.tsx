import { FormEvent, useRef } from "react";
import { supabase } from "../../supabaseClient";

const createFood = async (title: string) => {
    const { data, error } = await supabase.from("foods").insert([{ title }]);
    if (error) {
        console.warn(error);
    } else if (data) {
        console.log(data);
    }
};

export default function CreateFoods() {
  const titleRef = useRef<any>();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const title = titleRef.current.value;
    createFood(title);
  };

  return (
    <form onSubmit={handleSubmit} className="prose">
      <div className="form-control">
        <label className="label" htmlFor="title">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          id="title"
          className="input-bordered input"
          ref={titleRef}
        />
      </div>
      <button type="submit" className="btn-primary btn">
        Create food
      </button>
    </form>
  );
}
