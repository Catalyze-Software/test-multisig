import type { Principal } from "@dfinity/principal";
import type { ActorMethod } from "@dfinity/agent";

export interface Account {
  owner: Principal;
  subaccount: [] | [Uint8Array | number[]];
}
export interface Dip20TransferArgs {
  to: Principal;
  amount: bigint;
}
export type Result = { Ok: null } | { Err: string };
export type Result_1 = { Ok: string } | { Err: string };
export interface SharedData {
  id: number;
  status: Status;
  votes: Votes;
  created_at: bigint;
  requested_by: Principal;
}
export type Status =
  | { Deadlock: null }
  | { Approved: null }
  | { Rejected: null }
  | { Expired: null }
  | { Pending: null };
export type TokenStandard = { ICRC1: null } | { DIP20: null };
export interface TransactionRequestData {
  args: TransferRequestType;
  data: SharedData;
  canister_id: Principal;
}
export interface TransferArgs {
  to: Account;
  fee: [] | [bigint];
  memo: [] | [Uint8Array | number[]];
  from_subaccount: [] | [Uint8Array | number[]];
  created_at_time: [] | [bigint];
  amount: bigint;
}
export type TransferRequestType =
  | { ICRC1: TransferArgs }
  | { DIP20: Dip20TransferArgs };
export type VoteType = { Approve: null } | { Reject: null };
export interface Votes {
  rejections: Array<Principal>;
  approvals: Array<Principal>;
}
export interface WhitelistRequestData {
  request_type: WhitelistRequestType;
  data: SharedData;
}
export type Amount = { DIP20: number } | { ICRC1: bigint };
export interface AirdropRequestData {
  transfer_args: Array<TransferRequestType>;
  canister_id: Principal;
  data: SharedData;
}
export interface AirdropTransactionDetails {
  status: Status;
  receiver: Principal;
  amount: Amount;
  canister_id: Principal;
  token_standard: TokenStandard;
}
export type WhitelistRequestType = { Add: Principal } | { Remove: Principal };
export interface _SERVICE {
  __get_candid_interface_tmp_hack: ActorMethod<[], string>;
  get_token_list: ActorMethod<[], Array<[Principal, TokenStandard]>>;
  add_token_from_list: ActorMethod<[Principal, TokenStandard], Result>;
  remove_token_from_list: ActorMethod<[Principal], Result>;
  get_transaction_requests: ActorMethod<
    [[] | [Status]],
    Array<TransactionRequestData>
  >;
  transaction_request: ActorMethod<[Principal, TransferRequestType], Result_1>;
  vote_on_transaction_request: ActorMethod<[number, VoteType], Result_1>;
  vote_on_whitelist_request: ActorMethod<[number, VoteType], Result_1>;
  get_whitelist: ActorMethod<[], Array<Principal>>;
  get_whitelist_requests: ActorMethod<
    [[] | [Status]],
    Array<WhitelistRequestData>
  >;
  whitelist_request: ActorMethod<[WhitelistRequestType], Result_1>;
  airdrop_request: ActorMethod<
    [Principal, Array<TransferRequestType>],
    Result_1
  >;
  get_airdrop_requests: ActorMethod<[[] | [Status]], Array<AirdropRequestData>>;
  get_airdrop_transactions: ActorMethod<
    [number],
    Array<[Array<AirdropTransactionDetails>, string]>
  >;
  vote_on_airdrop_request: ActorMethod<[number, VoteType], Result_1>;
}

export const idlFactory = ({ IDL }: any) => {
  const TokenStandard = IDL.Variant({ ICRC1: IDL.Null, DIP20: IDL.Null });
  const Result = IDL.Variant({ Ok: IDL.Null, Err: IDL.Text });
  const Status = IDL.Variant({
    Deadlock: IDL.Null,
    Approved: IDL.Null,
    Rejected: IDL.Null,
    Expired: IDL.Null,
    Pending: IDL.Null,
  });
  const Account = IDL.Record({
    owner: IDL.Principal,
    subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const TransferArgs = IDL.Record({
    to: Account,
    fee: IDL.Opt(IDL.Nat),
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(IDL.Nat64),
    amount: IDL.Nat,
  });
  const Dip20TransferArgs = IDL.Record({
    to: IDL.Principal,
    amount: IDL.Nat64,
  });
  const TransferRequestType = IDL.Variant({
    ICRC1: TransferArgs,
    DIP20: Dip20TransferArgs,
  });
  const Votes = IDL.Record({
    rejections: IDL.Vec(IDL.Principal),
    approvals: IDL.Vec(IDL.Principal),
  });
  const SharedData = IDL.Record({
    id: IDL.Nat32,
    status: Status,
    votes: Votes,
    created_at: IDL.Nat64,
    requested_by: IDL.Principal,
  });
  const TransactionRequestData = IDL.Record({
    args: TransferRequestType,
    data: SharedData,
    canister_id: IDL.Principal,
  });
  const WhitelistRequestType = IDL.Variant({
    Add: IDL.Principal,
    Remove: IDL.Principal,
  });
  const WhitelistRequestData = IDL.Record({
    request_type: WhitelistRequestType,
    data: SharedData,
  });
  const Amount = IDL.Variant({
    DIP20: IDL.Nat32,
    ICRC1: IDL.Nat,
  });
  const AirdropRequestData = IDL.Record({
    transfer_args: IDL.Vec(TransferRequestType),
    canister_id: IDL.Principal,
    data: SharedData,
  });
  const AirdropTransactionDetails = IDL.Record({
    status: Status,
    receiver: IDL.Principal,
    amount: Amount,
    canister_id: IDL.Principal,
    token_standard: TokenStandard,
  });
  const Result_1 = IDL.Variant({ Ok: IDL.Text, Err: IDL.Text });
  const VoteType = IDL.Variant({ Approve: IDL.Null, Reject: IDL.Null });
  return IDL.Service({
    __get_candid_interface_tmp_hack: IDL.Func([], [IDL.Text], ["query"]),
    add_token_from_list: IDL.Func([IDL.Principal, TokenStandard], [Result], []),
    get_token_list: IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(IDL.Principal, TokenStandard))],
      ["query"]
    ),
    get_transaction_requests: IDL.Func(
      [IDL.Opt(Status)],
      [IDL.Vec(TransactionRequestData)],
      ["query"]
    ),
    get_whitelist: IDL.Func([], [IDL.Vec(IDL.Principal)], ["query"]),
    get_whitelist_requests: IDL.Func(
      [IDL.Opt(Status)],
      [IDL.Vec(WhitelistRequestData)],
      ["query"]
    ),
    remove_token_from_list: IDL.Func([IDL.Principal], [Result], []),
    transaction_request: IDL.Func(
      [IDL.Principal, TransferRequestType],
      [Result_1],
      []
    ),
    vote_on_transaction_request: IDL.Func(
      [IDL.Nat32, VoteType],
      [Result_1],
      []
    ),
    vote_on_whitelist_request: IDL.Func([IDL.Nat32, VoteType], [Result_1], []),
    whitelist_request: IDL.Func([WhitelistRequestType], [Result_1], []),
    airdrop_request: IDL.Func(
      [IDL.Principal, IDL.Vec(TransferRequestType)],
      [Result_1],
      []
    ),
    get_airdrop_requests: IDL.Func(
      [IDL.Opt(Status)],
      [IDL.Vec(AirdropRequestData)],
      ["query"]
    ),
    get_airdrop_transactions: IDL.Func(
      [IDL.Nat32],
      [IDL.Vec([IDL.Vec(AirdropTransactionDetails), IDL.Text])],
      ["query"]
    ),
    vote_on_airdrop_request: IDL.Func([IDL.Nat32, VoteType], [Result_1], []),
  });
};
