import type { Principal } from "@dfinity/principal";
import type { ActorMethod } from "@dfinity/agent";

export interface Account {
  owner: Principal;
  subaccount: [] | [Uint8Array | number[]];
}
export interface AirdropRequestData {
  data: SharedData;
  canister_id: Principal;
  tranfer_args: Array<TransferRequestType>;
}
export interface AirdropTransactionDetails {
  status: Status;
  canister_id: Principal;
  token_standard: TokenStandard;
  amount: Amount;
  receiver: Principal;
}
export type Amount = { ICRC1: bigint } | { DIP20: bigint };
export interface Dip20TransferArgs {
  to: Principal;
  amount: bigint;
}
export type Result = { Ok: null } | { Err: string };
export type Result_1 = { Ok: string } | { Err: string };
export type Result_2 = { Ok: Array<AirdropTransactionDetails> } | { Err: string };
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
export interface TransferArg {
  to: Account;
  fee: [] | [bigint];
  memo: [] | [Uint8Array | number[]];
  from_subaccount: [] | [Uint8Array | number[]];
  created_at_time: [] | [bigint];
  amount: bigint;
}
export type TransferRequestType = { ICRC1: TransferArg } | { DIP20: Dip20TransferArgs };
export type VoteType = { Approve: null } | { Reject: null };
export interface Votes {
  rejections: Array<Principal>;
  approvals: Array<Principal>;
}
export interface WhitelistRequestData {
  request_type: WhitelistRequestType;
  data: SharedData;
}
export type WhitelistRequestType = { Add: Principal } | { Remove: Principal };
export interface _SERVICE {
  __get_candid_interface_tmp_hack: ActorMethod<[], string>;
  add_token_to_list: ActorMethod<[Principal, TokenStandard], Result>;
  airdrop_request: ActorMethod<[Principal, Array<TransferRequestType>], Result_1>;
  get_airdrop_error: ActorMethod<[number], Result_1>;
  get_airdrop_requests: ActorMethod<[[] | [Status]], Array<AirdropRequestData>>;
  get_airdrop_transactions: ActorMethod<[number], Result_2>;
  get_time_out: ActorMethod<[], bigint>;
  get_token_list: ActorMethod<[], Array<[Principal, TokenStandard]>>;
  get_transaction_requests: ActorMethod<[[] | [Status]], Array<TransactionRequestData>>;
  get_whitelist: ActorMethod<[], Array<Principal>>;
  get_whitelist_requests: ActorMethod<[[] | [Status]], Array<WhitelistRequestData>>;
  remove_token_from_list: ActorMethod<[Principal], Result>;
  transaction_request: ActorMethod<[Principal, TransferRequestType], Result_1>;
  vote_on_airdrop_request: ActorMethod<[number, VoteType], Result_1>;
  vote_on_transaction_request: ActorMethod<[number, VoteType], Result_1>;
  vote_on_whitelist_request: ActorMethod<[number, VoteType], Result_1>;
  whitelist_request: ActorMethod<[WhitelistRequestType], Result_1>;
}

export const idlFactory = ({ IDL }: any) => {
  const TokenStandard = IDL.Variant({ ICRC1: IDL.Null, DIP20: IDL.Null });
  const Result = IDL.Variant({ Ok: IDL.Null, Err: IDL.Text });
  const Account = IDL.Record({
    owner: IDL.Principal,
    subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const TransferArg = IDL.Record({
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
    ICRC1: TransferArg,
    DIP20: Dip20TransferArgs,
  });
  const Result_1 = IDL.Variant({ Ok: IDL.Text, Err: IDL.Text });
  const Status = IDL.Variant({
    Deadlock: IDL.Null,
    Approved: IDL.Null,
    Rejected: IDL.Null,
    Expired: IDL.Null,
    Pending: IDL.Null,
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
  const AirdropRequestData = IDL.Record({
    data: SharedData,
    canister_id: IDL.Principal,
    tranfer_args: IDL.Vec(TransferRequestType),
  });
  const Amount = IDL.Variant({ ICRC1: IDL.Nat, DIP20: IDL.Nat64 });
  const AirdropTransactionDetails = IDL.Record({
    status: Status,
    canister_id: IDL.Principal,
    token_standard: TokenStandard,
    amount: Amount,
    receiver: IDL.Principal,
  });
  const Result_2 = IDL.Variant({
    Ok: IDL.Vec(AirdropTransactionDetails),
    Err: IDL.Text,
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
  const VoteType = IDL.Variant({ Approve: IDL.Null, Reject: IDL.Null });
  return IDL.Service({
    __get_candid_interface_tmp_hack: IDL.Func([], [IDL.Text], ["query"]),
    add_token_to_list: IDL.Func([IDL.Principal, TokenStandard], [Result], []),
    airdrop_request: IDL.Func([IDL.Principal, IDL.Vec(TransferRequestType)], [Result_1], []),
    get_airdrop_error: IDL.Func([IDL.Nat32], [Result_1], ["query"]),
    get_airdrop_requests: IDL.Func([IDL.Opt(Status)], [IDL.Vec(AirdropRequestData)], ["query"]),
    get_airdrop_transactions: IDL.Func([IDL.Nat32], [Result_2], ["query"]),
    get_time_out: IDL.Func([], [IDL.Nat64], ["query"]),
    get_token_list: IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Principal, TokenStandard))], ["query"]),
    get_transaction_requests: IDL.Func([IDL.Opt(Status)], [IDL.Vec(TransactionRequestData)], ["query"]),
    get_whitelist: IDL.Func([], [IDL.Vec(IDL.Principal)], ["query"]),
    get_whitelist_requests: IDL.Func([IDL.Opt(Status)], [IDL.Vec(WhitelistRequestData)], ["query"]),
    remove_token_from_list: IDL.Func([IDL.Principal], [Result], []),
    transaction_request: IDL.Func([IDL.Principal, TransferRequestType], [Result_1], []),
    vote_on_airdrop_request: IDL.Func([IDL.Nat32, VoteType], [Result_1], []),
    vote_on_transaction_request: IDL.Func([IDL.Nat32, VoteType], [Result_1], []),
    vote_on_whitelist_request: IDL.Func([IDL.Nat32, VoteType], [Result_1], []),
    whitelist_request: IDL.Func([WhitelistRequestType], [Result_1], []),
  });
};
