export type ApiVerificationStatus = 'VERIFIED' | 'UNVERIFIED' | 'PENDING';
export type ApiSellerType = 'PERSONAL' | 'STORE';
export type ApiListingCondition = 'NEW' | 'USED';
export type ApiListingStatus = 'DRAFT' | 'PUBLISHED' | 'SOLD' | 'ARCHIVED';

export interface ApiListingImage {
  id: string;
  imageUrl: string;
  sortOrder: number;
}

export interface ApiUserSummary {
  id: string;
  fullName: string;
  email?: string;
  accountType?: string;
  verificationStatus: ApiVerificationStatus;
}

export interface ApiStoreProfileSummary {
  id: string;
  storeName: string;
  slug: string;
  description?: string | null;
  isFeatured?: boolean;
  logoUrl?: string | null;
  bannerUrl?: string | null;
}

export interface ApiListing {
  id: string;
  slug: string;
  status: ApiListingStatus;
  title: string;
  description: string;
  category: string;
  condition: ApiListingCondition;
  price: number | string;
  location: string;
  sellerType: ApiSellerType;
  createdAt: string;
  images?: ApiListingImage[];
  user?: ApiUserSummary;
  storeProfile?: ApiStoreProfileSummary | null;
}

export interface ApiStorePublicResponse {
  store: {
    id: string;
    slug: string;
    storeName: string;
    description?: string | null;
    phone?: string | null;
    whatsapp?: string | null;
    logoUrl?: string | null;
    bannerUrl?: string | null;
    isFeatured: boolean;
    createdAt: string;
    owner: ApiUserSummary;
  };
  listings: ApiListing[];
  summary: {
    listingCount: number;
  };
}

export interface ApiStoreProfile {
  id: string;
  userId: string;
  storeName: string;
  slug: string;
  description: string | null;
  phone: string | null;
  whatsapp: string | null;
  logoUrl: string | null;
  bannerUrl: string | null;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiStoreDashboardResponse {
  storeProfile: ApiStoreProfile;
  productCount: number;
  orderCount: number;
  latestListings: ApiListing[];
  summary: {
    latestListingCount: number;
  };
}

export interface ApiAuthUser {
  id: string;
  fullName: string;
  email: string;
  accountType: 'PERSONAL' | 'STORE';
  verificationStatus: ApiVerificationStatus;
  verifiedAt: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  storeProfile: {
    id: string;
    storeName: string;
    slug: string;
    isFeatured: boolean;
    logoUrl: string | null;
    bannerUrl: string | null;
  } | null;
}

export interface ApiSignInResponse {
  accessToken: string;
  user: ApiAuthUser;
}

export interface ApiSignUpResponse {
  message: string;
  verificationRequired: true;
  verificationEmail: string;
}

export interface ApiVerificationRequestResponse {
  message: string;
  verificationEmail: string;
  expiresAt: string;
  mockOtp?: string;
}

export interface ApiVerificationConfirmResponse {
  message: string;
  user: ApiAuthUser;
}

export interface ApiFavorite {
  id: string;
  listingId: string;
  createdAt: string;
  listing: ApiListing;
}

export interface ApiCartItem {
  id: string;
  cartId: string;
  listingId: string;
  quantity: number;
  unitPrice: number | string;
  createdAt: string;
  updatedAt: string;
  listing: ApiListing;
}

export interface ApiCartResponse {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  items: ApiCartItem[];
  summary: {
    itemCount: number;
  };
}

export type ApiCheckoutPaymentMethod = 'COD' | 'BKASH';

export interface ApiOrderItem {
  id: string;
  orderId: string;
  listingId: string;
  quantity: number;
  unitPrice: number | string;
  listing?: ApiListing;
}

export interface ApiOrder {
  id: string;
  userId: string;
  storeProfileId: string;
  paymentMethod: string;
  status: string;
  subtotal: number | string;
  total: number | string;
  createdAt: string;
  updatedAt: string;
  items: ApiOrderItem[];
}

export interface ApiOrderStoreProfile {
  id: string;
  storeName: string;
  slug: string;
  logoUrl: string | null;
  isFeatured: boolean;
}

export interface ApiMyOrder extends ApiOrder {
  storeProfile: ApiOrderStoreProfile;
}

export interface ApiCreateOrderResponse {
  message: string;
  orders: ApiOrder[];
  summary: {
    orderCount: number;
  };
}

export interface ApiRating {
  id: string;
  userId: string;
  listingId: string;
  value: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    fullName: string;
  };
}

export interface ApiListingRatingsResponse {
  ratings: ApiRating[];
  average: number | null;
  count: number;
}
