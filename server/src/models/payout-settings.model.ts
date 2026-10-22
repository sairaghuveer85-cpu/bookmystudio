import mongoose, { Document, Model, Schema } from 'mongoose';

export type AccountHolderType = 'individual' | 'business';
export type BankAccountType = 'savings' | 'current';

export type PayoutStatus =
  | 'NOT_SET_UP'
  | 'DETAILS_INCOMPLETE'
  | 'DETAILS_SAVED'
  | 'AWAITING_PROVIDER_CONNECTION'
  | 'VERIFICATION_PENDING'
  | 'SUBMITTED_FOR_VERIFICATION'
  | 'VERIFICATION_REQUIRED'
  | 'VERIFIED_READY'
  | 'ACTION_REQUIRED'
  | 'UNAVAILABLE';

export type ProviderOnboardingStatus =
  | 'not_created'
  | 'created'
  | 'under_review'
  | 'needs_clarification'
  | 'activated'
  | 'rejected'
  | 'suspended';

export interface IPayoutAuditEntry {
  action: string;
  performedAt: Date;
  ip?: string | null;
  note?: string | null;
}

export interface IPayoutSettings extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  accountHolderName: string;
  accountHolderType: AccountHolderType;
  accountType: BankAccountType;
  accountNumberLast4: string;
  encryptedAccountNumber: string;
  accountNumberIv: string;
  accountNumberTag: string;
  ifsc: string;
  bankName?: string | null;
  businessName?: string | null;
  businessType?: string | null;
  businessPan?: string | null;
  businessGstin?: string | null;
  provider: 'razorpay';
  razorpayAccountId?: string | null;
  providerOnboardingStatus: ProviderOnboardingStatus;
  status: PayoutStatus;
  statusMessage?: string | null;
  missingRequirements: string[];
  auditLog: IPayoutAuditEntry[];
  createdAt: Date;
  updatedAt: Date;
  toSafeResponse(providerConfigured: boolean): Record<string, unknown>;
}

const payoutAuditSchema = new Schema<IPayoutAuditEntry>(
  {
    action: { type: String, required: true },
    performedAt: { type: Date, default: Date.now },
    ip: { type: String, default: null },
    note: { type: String, default: null },
  },
  { _id: false }
);

const payoutSettingsSchema = new Schema<IPayoutSettings>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    accountHolderName: {
      type: String,
      required: [true, 'Account holder name is required'],
      trim: true,
      maxlength: [120, 'Account holder name cannot exceed 120 characters'],
    },
    accountHolderType: {
      type: String,
      enum: ['individual', 'business'],
      default: 'individual',
      required: true,
    },
    accountType: {
      type: String,
      enum: ['savings', 'current'],
      default: 'savings',
      required: true,
    },
    accountNumberLast4: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 4,
    },
    encryptedAccountNumber: {
      type: String,
      required: true,
      select: false, // Protected: exclude from standard queries
    },
    accountNumberIv: {
      type: String,
      required: true,
      select: false,
    },
    accountNumberTag: {
      type: String,
      required: true,
      select: false,
    },
    ifsc: {
      type: String,
      required: [true, 'IFSC code is required'],
      uppercase: true,
      trim: true,
      match: [/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Please provide a valid 11-character Indian IFSC code'],
    },
    bankName: {
      type: String,
      trim: true,
      default: null,
    },
    businessName: {
      type: String,
      trim: true,
      default: null,
    },
    businessType: {
      type: String,
      trim: true,
      default: null,
    },
    businessPan: {
      type: String,
      trim: true,
      default: null,
      select: false,
    },
    businessGstin: {
      type: String,
      trim: true,
      default: null,
    },
    provider: {
      type: String,
      enum: ['razorpay'],
      default: 'razorpay',
      required: true,
    },
    razorpayAccountId: {
      type: String,
      default: null,
      index: true,
    },
    providerOnboardingStatus: {
      type: String,
      enum: [
        'not_created',
        'created',
        'under_review',
        'needs_clarification',
        'activated',
        'rejected',
        'suspended',
      ],
      default: 'not_created',
    },
    status: {
      type: String,
      enum: [
        'NOT_SET_UP',
        'DETAILS_INCOMPLETE',
        'DETAILS_SAVED',
        'AWAITING_PROVIDER_CONNECTION',
        'VERIFICATION_PENDING',
        'SUBMITTED_FOR_VERIFICATION',
        'VERIFICATION_REQUIRED',
        'VERIFIED_READY',
        'ACTION_REQUIRED',
        'UNAVAILABLE',
      ],
      default: 'DETAILS_INCOMPLETE',
    },
    statusMessage: {
      type: String,
      default: null,
    },
    missingRequirements: {
      type: [String],
      default: [],
    },
    auditLog: {
      type: [payoutAuditSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Returns a sanitized client representation of the payout settings,
 * never exposing full account numbers, encryption keys, or internal tokens.
 */
payoutSettingsSchema.methods.toSafeResponse = function (
  providerConfigured: boolean
): Record<string, unknown> {
  let displayStatus = this.status;
  let statusMessage = this.statusMessage;

  if (!providerConfigured) {
    displayStatus = 'AWAITING_PROVIDER_CONNECTION';
    statusMessage =
      'Your payout settings can be prepared now. Payment-provider activation and verification will be completed by the deployment team.';
  }

  const statusLabelMap: Record<string, string> = {
    NOT_SET_UP: 'Not Set Up',
    DETAILS_INCOMPLETE: 'Details Incomplete',
    DETAILS_SAVED: 'Details Saved',
    AWAITING_PROVIDER_CONNECTION: 'Awaiting Razorpay Route Connection',
    VERIFICATION_PENDING: 'Verification Pending',
    SUBMITTED_FOR_VERIFICATION: 'Submitted for Verification',
    VERIFICATION_REQUIRED: 'Verification Required',
    VERIFIED_READY: 'Verified / Ready',
    ACTION_REQUIRED: 'Action Required',
    UNAVAILABLE: 'Unavailable',
  };

  return {
    hasPayoutSettings: true,
    accountHolderName: this.accountHolderName,
    accountHolderType: this.accountHolderType,
    accountType: this.accountType,
    accountNumberMasked: `••••••••${this.accountNumberLast4}`,
    accountNumberLast4: this.accountNumberLast4,
    ifsc: this.ifsc,
    bankName: this.bankName,
    businessName: this.businessName,
    businessType: this.businessType,
    businessGstin: this.businessGstin,
    status: displayStatus,
    statusLabel: statusLabelMap[displayStatus] || displayStatus,
    statusMessage: statusMessage,
    provider: this.provider,
    providerOnboardingConnected: Boolean(providerConfigured && this.razorpayAccountId),
    providerAccountId: this.razorpayAccountId || null,
    providerOnboardingStatus: this.providerOnboardingStatus,
    missingRequirements: this.missingRequirements,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

export const PayoutSettings: Model<IPayoutSettings> = mongoose.model<IPayoutSettings>(
  'PayoutSettings',
  payoutSettingsSchema
);
