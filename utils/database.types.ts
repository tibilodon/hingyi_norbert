export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Home: {
        Row: {
          banner_hero: string | null
          bannerBox_1_label: string | null
          bannerBox_1_text: string | null
          bannerBox_2_label: string | null
          bannerBox_2_text: string | null
          bannerBox_3_label: string | null
          bannerBox_3_text: string | null
          bannerBox_4_label: string | null
          bannerBox_4_text: string | null
          btn1: string | null
          btn3: string | null
          created_at: string
          id: number
          line1_1: string | null
          line1_2: string | null
          line1_3: string | null
          line1_4: string | null
          name: string | null
          phoneNumber: string | null
          profession: string | null
          user_id: string | null
        }
        Insert: {
          banner_hero?: string | null
          bannerBox_1_label?: string | null
          bannerBox_1_text?: string | null
          bannerBox_2_label?: string | null
          bannerBox_2_text?: string | null
          bannerBox_3_label?: string | null
          bannerBox_3_text?: string | null
          bannerBox_4_label?: string | null
          bannerBox_4_text?: string | null
          btn1?: string | null
          btn3?: string | null
          created_at?: string
          id?: number
          line1_1?: string | null
          line1_2?: string | null
          line1_3?: string | null
          line1_4?: string | null
          name?: string | null
          phoneNumber?: string | null
          profession?: string | null
          user_id?: string | null
        }
        Update: {
          banner_hero?: string | null
          bannerBox_1_label?: string | null
          bannerBox_1_text?: string | null
          bannerBox_2_label?: string | null
          bannerBox_2_text?: string | null
          bannerBox_3_label?: string | null
          bannerBox_3_text?: string | null
          bannerBox_4_label?: string | null
          bannerBox_4_text?: string | null
          btn1?: string | null
          btn3?: string | null
          created_at?: string
          id?: number
          line1_1?: string | null
          line1_2?: string | null
          line1_3?: string | null
          line1_4?: string | null
          name?: string | null
          phoneNumber?: string | null
          profession?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      Owner: {
        Row: {
          created_at: string
          id: number
          is_complete: boolean
          test: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          is_complete?: boolean
          test?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          is_complete?: boolean
          test?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
