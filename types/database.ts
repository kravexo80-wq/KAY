export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          first_name: string | null;
          last_name: string | null;
          display_name: string | null;
          avatar_url: string | null;
          role: Database["public"]["Enums"]["app_role"];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          display_name?: string | null;
          avatar_url?: string | null;
          role?: Database["public"]["Enums"]["app_role"];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          display_name?: string | null;
          avatar_url?: string | null;
          role?: Database["public"]["Enums"]["app_role"];
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      categories: {
        Row: {
          id: string;
          name: string;
          name_ar: string | null;
          slug: string;
          description: string;
          description_ar: string | null;
          sort_order: number;
          is_active: boolean;
          is_featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          name_ar?: string | null;
          slug: string;
          description?: string;
          description_ar?: string | null;
          sort_order?: number;
          is_active?: boolean;
          is_featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          name_ar?: string | null;
          slug?: string;
          description?: string;
          description_ar?: string | null;
          sort_order?: number;
          is_active?: boolean;
          is_featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      collections: {
        Row: {
          id: string;
          name: string;
          name_ar: string | null;
          slug: string;
          eyebrow: string;
          eyebrow_ar: string | null;
          description: string;
          description_ar: string | null;
          highlight: string;
          highlight_ar: string | null;
          tone: Database["public"]["Enums"]["product_image_tone"];
          sort_order: number;
          is_active: boolean;
          is_featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          name_ar?: string | null;
          slug: string;
          eyebrow?: string;
          eyebrow_ar?: string | null;
          description?: string;
          description_ar?: string | null;
          highlight?: string;
          highlight_ar?: string | null;
          tone?: Database["public"]["Enums"]["product_image_tone"];
          sort_order?: number;
          is_active?: boolean;
          is_featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          name_ar?: string | null;
          slug?: string;
          eyebrow?: string;
          eyebrow_ar?: string | null;
          description?: string;
          description_ar?: string | null;
          highlight?: string;
          highlight_ar?: string | null;
          tone?: Database["public"]["Enums"]["product_image_tone"];
          sort_order?: number;
          is_active?: boolean;
          is_featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          category_id: string;
          collection_id: string | null;
          name: string;
          name_ar: string | null;
          slug: string;
          short_description: string;
          short_description_ar: string | null;
          description: string;
          description_ar: string | null;
          story: string;
          story_ar: string | null;
          base_price: number;
          compare_at_price: number | null;
          currency_code: string;
          tags: string[];
          tags_ar: string[] | null;
          materials: string[];
          materials_ar: string[] | null;
          fabric_notes: string[];
          fabric_notes_ar: string[] | null;
          care_notes: string[];
          care_notes_ar: string[] | null;
          fit_notes: string[];
          fit_notes_ar: string[] | null;
          specs: Json;
          specs_ar: Json | null;
          limited_edition: boolean;
          is_active: boolean;
          is_featured: boolean;
          viewer_360_enabled: boolean;
          viewer_360_label: string;
          viewer_360_label_ar: string | null;
          viewer_360_description: string;
          viewer_360_description_ar: string | null;
          viewer_360_note: string;
          viewer_360_note_ar: string | null;
          shipping_lead_time: string;
          shipping_lead_time_ar: string | null;
          shipping_delivery: string;
          shipping_delivery_ar: string | null;
          shipping_returns: string;
          shipping_returns_ar: string | null;
          shipping_presentation: string;
          shipping_presentation_ar: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          collection_id?: string | null;
          name: string;
          name_ar?: string | null;
          slug: string;
          short_description?: string;
          short_description_ar?: string | null;
          description?: string;
          description_ar?: string | null;
          story?: string;
          story_ar?: string | null;
          base_price: number;
          compare_at_price?: number | null;
          currency_code?: string;
          tags?: string[];
          tags_ar?: string[] | null;
          materials?: string[];
          materials_ar?: string[] | null;
          fabric_notes?: string[];
          fabric_notes_ar?: string[] | null;
          care_notes?: string[];
          care_notes_ar?: string[] | null;
          fit_notes?: string[];
          fit_notes_ar?: string[] | null;
          specs?: Json;
          specs_ar?: Json | null;
          limited_edition?: boolean;
          is_active?: boolean;
          is_featured?: boolean;
          viewer_360_enabled?: boolean;
          viewer_360_label?: string;
          viewer_360_label_ar?: string | null;
          viewer_360_description?: string;
          viewer_360_description_ar?: string | null;
          viewer_360_note?: string;
          viewer_360_note_ar?: string | null;
          shipping_lead_time?: string;
          shipping_lead_time_ar?: string | null;
          shipping_delivery?: string;
          shipping_delivery_ar?: string | null;
          shipping_returns?: string;
          shipping_returns_ar?: string | null;
          shipping_presentation?: string;
          shipping_presentation_ar?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string;
          collection_id?: string | null;
          name?: string;
          name_ar?: string | null;
          slug?: string;
          short_description?: string;
          short_description_ar?: string | null;
          description?: string;
          description_ar?: string | null;
          story?: string;
          story_ar?: string | null;
          base_price?: number;
          compare_at_price?: number | null;
          currency_code?: string;
          tags?: string[];
          tags_ar?: string[] | null;
          materials?: string[];
          materials_ar?: string[] | null;
          fabric_notes?: string[];
          fabric_notes_ar?: string[] | null;
          care_notes?: string[];
          care_notes_ar?: string[] | null;
          fit_notes?: string[];
          fit_notes_ar?: string[] | null;
          specs?: Json;
          specs_ar?: Json | null;
          limited_edition?: boolean;
          is_active?: boolean;
          is_featured?: boolean;
          viewer_360_enabled?: boolean;
          viewer_360_label?: string;
          viewer_360_label_ar?: string | null;
          viewer_360_description?: string;
          viewer_360_description_ar?: string | null;
          viewer_360_note?: string;
          viewer_360_note_ar?: string | null;
          shipping_lead_time?: string;
          shipping_lead_time_ar?: string | null;
          shipping_delivery?: string;
          shipping_delivery_ar?: string | null;
          shipping_returns?: string;
          shipping_returns_ar?: string | null;
          shipping_presentation?: string;
          shipping_presentation_ar?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_collection_id_fkey";
            columns: ["collection_id"];
            isOneToOne: false;
            referencedRelation: "collections";
            referencedColumns: ["id"];
          },
        ];
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          image_url: string | null;
          storage_path: string | null;
          alt_text: string;
          alt_text_ar: string | null;
          label: string;
          label_ar: string | null;
          angle: string;
          angle_ar: string | null;
          note: string;
          note_ar: string | null;
          tone: Database["public"]["Enums"]["product_image_tone"];
          sort_order: number;
          is_primary: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          image_url?: string | null;
          storage_path?: string | null;
          alt_text?: string;
          alt_text_ar?: string | null;
          label: string;
          label_ar?: string | null;
          angle?: string;
          angle_ar?: string | null;
          note?: string;
          note_ar?: string | null;
          tone?: Database["public"]["Enums"]["product_image_tone"];
          sort_order?: number;
          is_primary?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          image_url?: string | null;
          storage_path?: string | null;
          alt_text?: string;
          alt_text_ar?: string | null;
          label?: string;
          label_ar?: string | null;
          angle?: string;
          angle_ar?: string | null;
          note?: string;
          note_ar?: string | null;
          tone?: Database["public"]["Enums"]["product_image_tone"];
          sort_order?: number;
          is_primary?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      product_variants: {
        Row: {
          id: string;
          product_id: string;
          sku: string;
          size: string;
          color: string | null;
          price_override: number | null;
          stock_quantity: number;
          is_active: boolean;
          position: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          sku: string;
          size: string;
          color?: string | null;
          price_override?: number | null;
          stock_quantity?: number;
          is_active?: boolean;
          position?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          sku?: string;
          size?: string;
          color?: string | null;
          price_override?: number | null;
          stock_quantity?: number;
          is_active?: boolean;
          position?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      carts: {
        Row: {
          id: string;
          user_id: string | null;
          guest_token: string | null;
          status: Database["public"]["Enums"]["cart_status"];
          currency_code: string;
          expires_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          guest_token?: string | null;
          status?: Database["public"]["Enums"]["cart_status"];
          currency_code?: string;
          expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          guest_token?: string | null;
          status?: Database["public"]["Enums"]["cart_status"];
          currency_code?: string;
          expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      cart_items: {
        Row: {
          id: string;
          cart_id: string;
          product_variant_id: string;
          quantity: number;
          unit_price: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          cart_id: string;
          product_variant_id: string;
          quantity?: number;
          unit_price: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          cart_id?: string;
          product_variant_id?: string;
          quantity?: number;
          unit_price?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey";
            columns: ["cart_id"];
            isOneToOne: false;
            referencedRelation: "carts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cart_items_product_variant_id_fkey";
            columns: ["product_variant_id"];
            isOneToOne: false;
            referencedRelation: "product_variants";
            referencedColumns: ["id"];
          },
        ];
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          cart_id: string | null;
          order_number: string;
          status: Database["public"]["Enums"]["order_status"];
          payment_status: Database["public"]["Enums"]["payment_status"];
          currency_code: string;
          customer_email: string;
          subtotal_amount: number;
          shipping_amount: number;
          total_amount: number;
          shipping_address: Json;
          billing_address: Json;
          notes: string;
          stripe_checkout_session_id: string | null;
          stripe_payment_intent_id: string | null;
          inventory_adjusted_at: string | null;
          paid_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          cart_id?: string | null;
          order_number?: string;
          status?: Database["public"]["Enums"]["order_status"];
          payment_status?: Database["public"]["Enums"]["payment_status"];
          currency_code?: string;
          customer_email: string;
          subtotal_amount: number;
          shipping_amount?: number;
          total_amount: number;
          shipping_address?: Json;
          billing_address?: Json;
          notes?: string;
          stripe_checkout_session_id?: string | null;
          stripe_payment_intent_id?: string | null;
          inventory_adjusted_at?: string | null;
          paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          cart_id?: string | null;
          order_number?: string;
          status?: Database["public"]["Enums"]["order_status"];
          payment_status?: Database["public"]["Enums"]["payment_status"];
          currency_code?: string;
          customer_email?: string;
          subtotal_amount?: number;
          shipping_amount?: number;
          total_amount?: number;
          shipping_address?: Json;
          billing_address?: Json;
          notes?: string;
          stripe_checkout_session_id?: string | null;
          stripe_payment_intent_id?: string | null;
          inventory_adjusted_at?: string | null;
          paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "orders_cart_id_fkey";
            columns: ["cart_id"];
            isOneToOne: false;
            referencedRelation: "carts";
            referencedColumns: ["id"];
          },
        ];
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string | null;
          product_variant_id: string | null;
          product_name: string;
          product_slug: string;
          sku: string | null;
          size: string | null;
          color: string | null;
          quantity: number;
          unit_price: number;
          line_total: number;
          product_snapshot: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id?: string | null;
          product_variant_id?: string | null;
          product_name: string;
          product_slug: string;
          sku?: string | null;
          size?: string | null;
          color?: string | null;
          quantity: number;
          unit_price: number;
          product_snapshot?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string | null;
          product_variant_id?: string | null;
          product_name?: string;
          product_slug?: string;
          sku?: string | null;
          size?: string | null;
          color?: string | null;
          quantity?: number;
          unit_price?: number;
          product_snapshot?: Json;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_product_variant_id_fkey";
            columns: ["product_variant_id"];
            isOneToOne: false;
            referencedRelation: "product_variants";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      generate_order_number: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      finalize_paid_order_inventory: {
        Args: {
          order_uuid: string;
        };
        Returns: boolean;
      };
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      owns_cart: {
        Args: {
          cart_uuid: string;
        };
        Returns: boolean;
      };
      owns_order: {
        Args: {
          order_uuid: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      app_role: "customer" | "admin";
      cart_status: "active" | "converted" | "abandoned" | "expired";
      order_status:
        | "pending"
        | "confirmed"
        | "processing"
        | "fulfilled"
        | "shipped"
        | "delivered"
        | "cancelled"
        | "refunded";
      payment_status:
        | "pending"
        | "authorized"
        | "paid"
        | "partially_refunded"
        | "refunded"
        | "failed"
        | "cancelled";
      product_image_tone: "obsidian" | "stone" | "bronze" | "pearl";
    };
    CompositeTypes: Record<string, never>;
  };
}

type PublicSchema = Database["public"];

export type Tables<
  TableName extends keyof PublicSchema["Tables"],
> = PublicSchema["Tables"][TableName]["Row"];

export type TablesInsert<
  TableName extends keyof PublicSchema["Tables"],
> = PublicSchema["Tables"][TableName]["Insert"];

export type TablesUpdate<
  TableName extends keyof PublicSchema["Tables"],
> = PublicSchema["Tables"][TableName]["Update"];

export type Enums<
  EnumName extends keyof PublicSchema["Enums"],
> = PublicSchema["Enums"][EnumName];
