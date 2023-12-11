//realtime updates - webhook type

"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Owner from "./Owner";

type Props = {
  owner:
    | {
        created_at: string;
        id: number;
        is_complete: boolean;
        title: string | null;
        user_id: string | null;
      }[]
    | null;
};

const RealTimeOwner: React.FunctionComponent<Props> = ({ owner }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel("realtime owners")
      .on(
        "postgres_changes",
        {
          event: "*", //insert,update,delete
          schema: "public",
          table: "Owner",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [router, supabase]);

  return (
    <>
      <h1>realtimeowner</h1>
      {owner?.map((item, i) => {
        return (
          <div key={item.id}>
            {/* <p>{item.title}</p>
            <p>{item.created_at}</p>
            <p>{item.is_complete}</p> */}
            <Owner item={item} />
          </div>
        );
      })}
    </>
  );
};

export default RealTimeOwner;
