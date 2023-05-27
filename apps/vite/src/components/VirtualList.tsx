import { useRef } from "react";
import { Link } from "react-router-dom";
import { useVirtualizer } from '@tanstack/react-virtual';

export default function VirtualList ({ items }: any) {
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