import { FormEvent, useRef } from "react";
import { supabase } from "../../supabaseClient";

const createFood = async (fields: any) => {
    const { data, error } = await supabase.from("foods").insert([fields]);
    if (error) {
        console.warn(error);
    } else if (data) {
        console.log(data);
    }
};

export default function CreateFoods() {
  const titleRef = useRef<any>();
  const priceRef = useRef<any>();
  const quantityRef = useRef<any>();
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const fields = {
      title: titleRef.current.value,
      price: priceRef.current.value,
      quantity: quantityRef.current.value
    };
    createFood(fields);
  };

  return (
    <div className="m-8">
      <h2 className="text-3xl font-bold mb-4">New food</h2>
      <div className="card max-h-fit w-full max-w-sm bg-base-100 shadow-2xl  border border-accent/40">
        <div className="card-body">
          <form className="space-y-4" onSubmit={handleSubmit}>
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
            <div className="form-control">
              <label className="label" htmlFor="price">
                <span className="label-text">Price</span>
              </label>
              <input
                type="text"
                id="price"
                className="input-bordered input"
                ref={priceRef}
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="quantity">
                <span className="label-text">Quantity</span>
              </label>
              <input
                type="text"
                id="quantity"
                className="input-bordered input"
                ref={quantityRef}
              />
            </div>
            <div>
              <button type="submit" className="btn-primary btn">
                Create food
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
