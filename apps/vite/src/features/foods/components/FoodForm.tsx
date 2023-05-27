import { FormEvent, useEffect, useRef } from "react";
import { supabase } from "../../../supabaseClient";

const getFood = async (id: number) => {
    return supabase.from("foods").select().eq("id", id).single();
  }

export default function FoodForm({ onSubmit, buttonText, id }: any) {
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
      onSubmit(fields);
    };

    useEffect(() => {
        if (!id) return;
        getFood(Number(id)).then(({ data }) => {
          if (!data) return;
          titleRef.current.value = data.title;
          priceRef.current.value = data.price;
          quantityRef.current.value = data.quantity;
        });
      }, [id]);
  
    return (
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
            {buttonText}
          </button>
        </div>
      </form>
    );
  }