export interface Profile {
  id: string;
  full_name: string;
  role: "user" | "admin";
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  capacity: number;
  image_url: string;
  created_at: string;
}

export interface Registration {
  id: string;
  user_id: string;
  event_id: string;
  registered_at: string;
  qr_code: string;
  event?: Event;
}
