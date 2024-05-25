export interface Ride {
  id: string;
  startAddress: string;
  destinationAddress: string;
  departureDateTime: Date;
  passengerPhone: string;
  paymentMethod: 'Cash' | 'Card';
  cardNumber?: string;
  cardExpirationDate?: string;
  price: number;
}
