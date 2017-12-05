/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-spy
 */

import { Batch, Broadcast, Message, Post, Request, Response } from "./interfaces";

export function isBatch(message: Message): message is Batch {
    return message.messageType === "batch";
}

export function isBroadcast(message: Message): message is Broadcast {
    return message.messageType === "broadcast";
}

export function isPost(message: Message): message is Post {
    return message["postType"] !== undefined;
}

export function isPostRequest(message: Message): message is Post & Request {
    return isPost(message) && (message.messageType === "request");
}

export function isPostResponse(message: Message): message is Post & Response {
    return isPost(message) && (message.messageType === "response");
}

export function isRequest(message: Message): message is Request {
    return message.messageType === "request";
}

export function isResponse(message: Message): message is Response {
    return message.messageType === "response";
}
