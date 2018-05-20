import { BaseClient } from './client'

export * from './lib/error'

import {
    AlibumExtClient,
} from './extension/album'

import {
    ArtistExtClient,
} from './extension/artist'

import {
    BannerExtClient,
} from './extension/banner'

import {
    CommentExtClient,
    ResourceType,
} from './extension/comment'
export {
    ResourceType,
}

import {
    LoginData,
    LoginExtClient,
} from './extension/login'
export {
    LoginData,
}

import {
    MusicExtClient,
} from './extension/music'

import {
    PersonalFMData,
    PersonalizedExtClient,
    PersonalSingleFMData,
} from './extension/personalized'
export {
    PersonalSingleFMData,
    PersonalFMData,
}

import {
    PlaylistExtClient,
    PlaylistOperation,
} from './extension/playlist'
export {
    PlaylistOperation,
}

import {
    RadioExtClient,
} from './extension/radio'

import {
    RecommendExtClient,
} from './extension/recommend'

import {
    SearchExtClient,
    SearchType,
} from './extension/search'
export {
    SearchType,
}

import {
    SimiExtClient,
} from './extension/simi'

import {
    TopExtClient,
    TopListType,
    TopPlaylistOrder,
    TopResourceArea,
} from './extension/top'
export {
    TopListType,
    TopPlaylistOrder,
    TopResourceArea,
}

import {
    UserExtClient,
    UserRecordType,
} from './extension/user'
export {
    UserRecordType,
}

import { MvExtClient } from './extension/mv'

import { MessageExtClient } from './extension/message'

// https://www.typescriptlang.org/docs/handbook/declaration-merging.html
function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}

export interface MusicClient extends
    AlibumExtClient,
    ArtistExtClient,
    BannerExtClient,
    CommentExtClient,
    LoginExtClient,
    MusicExtClient,
    PersonalizedExtClient,
    RadioExtClient,
    PlaylistExtClient,
    RecommendExtClient,
    SearchExtClient,
    SimiExtClient,
    TopExtClient,
    UserExtClient,
    MvExtClient,
    MessageExtClient {
    // EMPTY
}

export class MusicClient extends BaseClient {}

applyMixins(MusicClient, [
    AlibumExtClient,
    ArtistExtClient,
    BannerExtClient,
    CommentExtClient,
    LoginExtClient,
    MusicExtClient,
    PersonalizedExtClient,
    RadioExtClient,
    PlaylistExtClient,
    RecommendExtClient,
    SearchExtClient,
    SimiExtClient,
    TopExtClient,
    UserExtClient,
    MvExtClient,
    MessageExtClient,
])
