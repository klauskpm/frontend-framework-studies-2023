import { FormEvent, useEffect, useRef } from "react";

import { supabase } from "../../supabaseClient";
import { useParams } from "react-router-dom";

const updateFood = async (id: number, title: string) => {
  const { data, error } = await supabase
    .from("foods")
    .update({ title })
    .eq("id", id);

  if (error) {
    console.warn(error);
  } else if (data) {
    console.log(data);
  }
};

export async function getFood(id: number) {
  return supabase.from("foods").select().eq("id", id).single();
}

export default function EditFood() {
  const { id } = useParams<{ id: string }>();
  const titleRef = useRef<any>();

  useEffect(() => {
    getFood(Number(id)).then(({ data }) => {
      if (!data) return;
      titleRef.current.value = data.title;
    });
  }, [id]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const title = titleRef.current.value;
    updateFood(Number(id), title);
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
        Update food
      </button>
    </form>
  );
}
