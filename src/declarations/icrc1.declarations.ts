import type { Principal } from "@dfinity/principal";
export interface Account {
  owner: Principal;
  subaccount: [] | [Subaccount];
}
export interface Allowance {
  allowance: bigint;
  expires_at: [] | [bigint];
}
export type ApproveError =
  | {
      GenericError: { message: string; error_code: bigint };
    }
  | { TemporarilyUnavailable: null }
  | { Duplicate: { duplicate_of: TxIndex } }
  | { BadFee: { expected_fee: Tokens } }
  | { AllowanceChanged: { current_allowance: bigint } }
  | { CreatedInFuture: { ledger_time: Timestamp } }
  | { TooOld: null }
  | { Expired: { ledger_time: bigint } }
  | { InsufficientFunds: { balance: Tokens } };
export interface Ledger {
  icrc1_balance_of: (arg_0: Account) => Promise<Tokens>;
  icrc1_decimals: () => Promise<number>;
  icrc1_fee: () => Promise<bigint>;
  icrc1_metadata: () => Promise<Array<[string, Value]>>;
  icrc1_minting_account: () => Promise<[] | [Account]>;
  icrc1_name: () => Promise<string>;
  icrc1_supported_standards: () => Promise<Array<{ url: string; name: string }>>;
  icrc1_symbol: () => Promise<string>;
  icrc1_total_supply: () => Promise<Tokens>;
  icrc1_transfer: (arg_0: {
    to: Account;
    fee: [] | [Tokens];
    memo: [] | [Memo];
    from_subaccount: [] | [Subaccount];
    created_at_time: [] | [Timestamp];
    amount: Tokens;
  }) => Promise<Result_2>;
  icrc2_allowance: (arg_0: { account: Account; spender: Account }) => Promise<Allowance>;
  icrc2_approve: (arg_0: {
    fee: [] | [Tokens];
    memo: [] | [Memo];
    from_subaccount: [] | [Subaccount];
    created_at_time: [] | [Timestamp];
    amount: bigint;
    expected_allowance: [] | [bigint];
    expires_at: [] | [bigint];
    spender: Account;
  }) => Promise<Result_1>;
  icrc2_transfer_from: (arg_0: {
    to: Account;
    fee: [] | [Tokens];
    spender_subaccount: [] | [Subaccount];
    from: Account;
    memo: [] | [Memo];
    created_at_time: [] | [Timestamp];
    amount: Tokens;
  }) => Promise<Result>;
}
export type Memo = Array<number>;
export type Result = { Ok: TxIndex } | { Err: TransferFromError };
export type Result_1 = { Ok: TxIndex } | { Err: ApproveError };
export type Result_2 = { Ok: TxIndex } | { Err: TransferError };
export type Subaccount = Array<number>;
export type Timestamp = bigint;
export type Tokens = bigint;
export type TransferError =
  | {
      GenericError: { message: string; error_code: bigint };
    }
  | { TemporarilyUnavailable: null }
  | { BadBurn: { min_burn_amount: Tokens } }
  | { Duplicate: { duplicate_of: TxIndex } }
  | { BadFee: { expected_fee: Tokens } }
  | { CreatedInFuture: { ledger_time: Timestamp } }
  | { TooOld: null }
  | { InsufficientFunds: { balance: Tokens } };
export type TransferFromError =
  | {
      GenericError: { message: string; error_code: bigint };
    }
  | { TemporarilyUnavailable: null }
  | { InsufficientAllowance: { allowance: bigint } }
  | { BadBurn: { min_burn_amount: Tokens } }
  | { Duplicate: { duplicate_of: TxIndex } }
  | { BadFee: { expected_fee: Tokens } }
  | { CreatedInFuture: { ledger_time: Timestamp } }
  | { TooOld: null }
  | { InsufficientFunds: { balance: Tokens } };
export type TxIndex = bigint;
export type Value = { Int: bigint } | { Nat: bigint } | { Blob: Array<number> } | { Text: string };

export const idlFactory = ({ IDL }: any) => {
  const Subaccount = IDL.Vec(IDL.Nat8);
  const Account = IDL.Record({
    owner: IDL.Principal,
    subaccount: IDL.Opt(Subaccount),
  });
  const Tokens = IDL.Nat;
  const Value = IDL.Variant({
    Int: IDL.Int,
    Nat: IDL.Nat,
    Blob: IDL.Vec(IDL.Nat8),
    Text: IDL.Text,
  });
  const Memo = IDL.Vec(IDL.Nat8);
  const Timestamp = IDL.Nat64;
  const TxIndex = IDL.Nat;
  const TransferError = IDL.Variant({
    GenericError: IDL.Record({
      message: IDL.Text,
      error_code: IDL.Nat,
    }),
    TemporarilyUnavailable: IDL.Null,
    BadBurn: IDL.Record({ min_burn_amount: Tokens }),
    Duplicate: IDL.Record({ duplicate_of: TxIndex }),
    BadFee: IDL.Record({ expected_fee: Tokens }),
    CreatedInFuture: IDL.Record({ ledger_time: Timestamp }),
    TooOld: IDL.Null,
    InsufficientFunds: IDL.Record({ balance: Tokens }),
  });
  const Result_2 = IDL.Variant({ Ok: TxIndex, Err: TransferError });
  const Allowance = IDL.Record({
    allowance: IDL.Nat,
    expires_at: IDL.Opt(IDL.Nat64),
  });
  const ApproveError = IDL.Variant({
    GenericError: IDL.Record({
      message: IDL.Text,
      error_code: IDL.Nat,
    }),
    TemporarilyUnavailable: IDL.Null,
    Duplicate: IDL.Record({ duplicate_of: TxIndex }),
    BadFee: IDL.Record({ expected_fee: Tokens }),
    AllowanceChanged: IDL.Record({ current_allowance: IDL.Nat }),
    CreatedInFuture: IDL.Record({ ledger_time: Timestamp }),
    TooOld: IDL.Null,
    Expired: IDL.Record({ ledger_time: IDL.Nat64 }),
    InsufficientFunds: IDL.Record({ balance: Tokens }),
  });
  const Result_1 = IDL.Variant({ Ok: TxIndex, Err: ApproveError });
  const TransferFromError = IDL.Variant({
    GenericError: IDL.Record({
      message: IDL.Text,
      error_code: IDL.Nat,
    }),
    TemporarilyUnavailable: IDL.Null,
    InsufficientAllowance: IDL.Record({ allowance: IDL.Nat }),
    BadBurn: IDL.Record({ min_burn_amount: Tokens }),
    Duplicate: IDL.Record({ duplicate_of: TxIndex }),
    BadFee: IDL.Record({ expected_fee: Tokens }),
    CreatedInFuture: IDL.Record({ ledger_time: Timestamp }),
    TooOld: IDL.Null,
    InsufficientFunds: IDL.Record({ balance: Tokens }),
  });
  const Result = IDL.Variant({ Ok: TxIndex, Err: TransferFromError });
  const Ledger = IDL.Service({
    icrc1_balance_of: IDL.Func([Account], [Tokens], ["query"]),
    icrc1_decimals: IDL.Func([], [IDL.Nat8], ["query"]),
    icrc1_fee: IDL.Func([], [IDL.Nat], ["query"]),
    icrc1_metadata: IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Text, Value))], ["query"]),
    icrc1_minting_account: IDL.Func([], [IDL.Opt(Account)], ["query"]),
    icrc1_name: IDL.Func([], [IDL.Text], ["query"]),
    icrc1_supported_standards: IDL.Func([], [IDL.Vec(IDL.Record({ url: IDL.Text, name: IDL.Text }))], ["query"]),
    icrc1_symbol: IDL.Func([], [IDL.Text], ["query"]),
    icrc1_total_supply: IDL.Func([], [Tokens], ["query"]),
    icrc1_transfer: IDL.Func(
      [
        IDL.Record({
          to: Account,
          fee: IDL.Opt(Tokens),
          memo: IDL.Opt(Memo),
          from_subaccount: IDL.Opt(Subaccount),
          created_at_time: IDL.Opt(Timestamp),
          amount: Tokens,
        }),
      ],
      [Result_2],
      []
    ),
    icrc2_allowance: IDL.Func([IDL.Record({ account: Account, spender: Account })], [Allowance], ["query"]),
    icrc2_approve: IDL.Func(
      [
        IDL.Record({
          fee: IDL.Opt(Tokens),
          memo: IDL.Opt(Memo),
          from_subaccount: IDL.Opt(Subaccount),
          created_at_time: IDL.Opt(Timestamp),
          amount: IDL.Nat,
          expected_allowance: IDL.Opt(IDL.Nat),
          expires_at: IDL.Opt(IDL.Nat64),
          spender: Account,
        }),
      ],
      [Result_1],
      []
    ),
    icrc2_transfer_from: IDL.Func(
      [
        IDL.Record({
          to: Account,
          fee: IDL.Opt(Tokens),
          spender_subaccount: IDL.Opt(Subaccount),
          from: Account,
          memo: IDL.Opt(Memo),
          created_at_time: IDL.Opt(Timestamp),
          amount: Tokens,
        }),
      ],
      [Result],
      []
    ),
  });
  return Ledger;
};
export const init = ({ IDL }: any) => {
  return [
    IDL.Record({
      decimals: IDL.Nat8,
      token_symbol: IDL.Text,
      transfer_fee: IDL.Nat,
      minting_account: IDL.Record({
        owner: IDL.Principal,
        subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
      }),
      initial_mints: IDL.Vec(
        IDL.Record({
          account: IDL.Record({
            owner: IDL.Principal,
            subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
          }),
          amount: IDL.Nat,
        })
      ),
      token_name: IDL.Text,
    }),
  ];
};
