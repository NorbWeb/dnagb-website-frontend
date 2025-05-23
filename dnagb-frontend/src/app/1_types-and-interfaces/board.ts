export interface Board {
  id: number;
  status: string;
  president_name: string;
  president_email: string;
  president_image: string;
  vice_name: string;
  vice_email: string;
  vice_image: string;
  treasurer_name: string;
  treasurer_email: string;
  treasurer_image: string;
  president_rank: string | null;
  vice_rank: string | null;
  treasurer_rank: null | null;
  president_role: string;
  vice_role: string;
  treasurer_role: string;
}
