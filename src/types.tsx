export type UserObject=UserData;

interface UserData {
    login?:               string |null|undefined; 
    id?:                  number |null|undefined;
    node_id?:             string |null|undefined;
    avatar_url?:          string |undefined;
    gravatar_id?:         string |null|undefined;
    url?:                 string |null|undefined;
    html_url?:            string |undefined;
    followers_url?:       string |null|undefined;
    following_url?:       string |null|undefined;
    gists_url?:           string |null|undefined;
    starred_url?:         string |null|undefined;

    subscriptions_url?:   string |null|undefined;
    organizations_url?:   string |null|undefined;
    repos_url?:           string |null|undefined;
    events_url?:          string |null|undefined;
    received_events_url?: string |null|undefined;
    type?:                string |null|undefined;
    site_admin?:          boolean |null|undefined;
    name?:                string |null|undefined;
    company?:             string |null|undefined;

    blog?:                string |null|undefined;
    location?: string |null|undefined;
    email?: null| string;
    hireable?: boolean |null|undefined;
    bio?: string |null|undefined;
    twitter_username?: null | string;
    public_repos?: number |null|undefined;
    public_gists?: number |null|undefined;
    followers?: number |null|undefined;
    following?: number |null|undefined;
    created_at?: string |null|undefined;
    updated_at?: string |null|undefined;
}

export type FollowersType=followers[];

 interface followers{
    login: string |null|undefined;
    id: number|null|undefined;
    node_id: string|null|undefined;
    avatar_url: string|undefined;
    gravatar_id: string|null|undefined;
    url: string|null|undefined;
    html_url: string|undefined;
    followers_url: string|null|undefined;
    following_url: string |null|undefined;
    gists_url: string |null|undefined;
    starred_url: string |null|undefined;
    subscriptions_url: string |null|undefined;
    organizations_url: string |null|undefined;
    repos_url: string |null|undefined;
    events_url: string |null|undefined;
    received_events_url: string |null|undefined;
    type: string |null|undefined;
    site_admin: boolean |null|undefined;
}

export interface Ratelimit {
    resources: Resources;
    rate:      Rate;
}

export interface Rate {
    limit:     number;
    remaining: number;
    reset:     number;
    used:      number;
    resource:  string;
}

export interface Resources {
    core:                 Rate;
    graphql:              Rate;
    integration_manifest: Rate;
    search:               Rate;
}

export interface datasetType {
    id:string;
    label:string;
    value:number;
    stars:number;
  }

export type poprepo={reponame:string,stars:number}

export type Forkrepo={reponame:string,fork:number}

export interface reduced {
    [key:string]:datasetType
  }
  export type obj={}
