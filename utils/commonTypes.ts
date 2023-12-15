type Home = {
  data:
    | {
        banner_hero: string | null;
        bannerBox_1_label: string | null;
        bannerBox_1_text: string | null;
        bannerBox_2_label: string | null;
        bannerBox_2_text: string | null;
        bannerBox_3_label: string | null;
        bannerBox_3_text: string | null;
        bannerBox_4_label: string | null;
        bannerBox_4_text: string | null;
        btn1: string | null;
        btn3: string | null;
        created_at: string;
        id: number;
        line1_1: string | null;
        line1_2: string | null;
        line1_3: string | null;
        line1_4: string | null;
        name: string | null;
        phoneNumber: string | null;
        profession: string | null;
        user_id: string | null;
        color: string | null;
      }[]
    | null;
};

type Miscellaneous = {
  data:
    | {
        color: string | null;
        created_at: string;
        email: string | null;
        footerText: string | null;
        id: number;
        phoneNumber: string | null;
        updated_at: string | null;
        user_id: string | null;
      }[]
    | null;
};

export type { Home, Miscellaneous };
