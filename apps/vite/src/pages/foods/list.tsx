import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Database } from "../../../supabase";
import { Link } from "react-router-dom";
import { useVirtualizer } from '@tanstack/react-virtual';

export type Food = Database["public"]["Tables"]["foods"]["Row"];
type SelectOptions = { head?: boolean | undefined; count?: "exact" | "planned" | "estimated" | undefined; } | undefined;

function getFoods(options?: SelectOptions) {
    return supabase.from("foods").select("*", options);
  }

const VirtualList = ({ items }: any) => {
    const parentRef = useRef(null);
  
    const rowVirtualizer = useVirtualizer({
      count: items.length,
      getScrollElement: () => parentRef.current,
      estimateSize: () => 35,
    });
  
    return (
      <div
        ref={parentRef}
        style={{
          height: `400px`,
          overflow: 'auto', // Make it scroll!
        }}
      >
        <ul
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <li
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <Link to={`/foods/${items[virtualRow.index].id}`} className="link-primary link">
                {items[virtualRow.index].title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default function FoodList() {
    const [foods, setFoods] = useState<Food[]>([]);

    const multipleFoods = useMemo(() => {
        if (!foods.length) return [];
        return Array.from({ length: 1000 }, (_, i) => foods[i%foods.length]);
    }, [foods]);

    useEffect(() => {
        getFoods().then(({ data }) => {
        if (!data) return;
        setFoods(data);
        });
    }, []);

    return <VirtualList items={multipleFoods} />;
    }