
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  image: string;
  company: {
    name: string;
    title: string;
  };
  address: {
    city: string;
    country: string;
  };
  age:number;
}