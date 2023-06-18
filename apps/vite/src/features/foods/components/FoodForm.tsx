import { FormEvent, useRef } from "react";

export default function FoodForm({ onSubmit, buttonText, food, loading }: any) {
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
            defaultValue={food?.title}
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
            defaultValue={food?.price}
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
            defaultValue={food?.quantity}
          />
        </div>
        <div>
          <button type="submit" className="btn-primary btn data-[loading=true]:loading" disabled={loading} data-loading={loading}>
            {loading ? "Loading..." : buttonText}
          </button>
        </div>
      </form>
    );
  }