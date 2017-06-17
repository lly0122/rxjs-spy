/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-spy
 */
/*tslint:disable:no-unused-expression*/

import { expect } from "chai";
import { Observable } from "rxjs/Observable";
import * as sinon from "sinon";
import { matches, tag } from "../../operator/tag";

import "rxjs/add/observable/from";
import "rxjs/add/observable/of";
import "rxjs/add/operator/toArray";
import "rxjs/add/operator/toPromise";
import "./tag";

describe("matches", () => {

    let source: Observable<string>;

    beforeEach(() => {

        source = Observable
            .from(["alice", "bob"])
            .tag("people");
    });

    it("should match an observable", () => {

        expect(matches(source, source)).to.be.true;
        expect(matches(Observable.of("mallory"), source)).to.be.false;
    });

    it("should match a string", () => {

        expect(matches(source, "people")).to.be.true;
        expect(matches(Observable.of("mallory"), "people")).to.be.false;
    });

    it("should match a regular expression", () => {

        expect(matches(source, /^people$/)).to.be.true;
        expect(matches(Observable.of("mallory"), /^people$/)).to.be.false;
    });

    it("should match a predicate", () => {

        function predicate(tag: string): boolean {
            return tag === "people";
        }

        expect(matches(source, predicate)).to.be.true;
        expect(matches(Observable.of("mallory"), predicate)).to.be.false;
    });

    it("should pass the observable to the predicate", () => {

        const stub = sinon.stub().returns(true);

        matches(source, stub);

        expect(stub).to.have.property("calledOnce", true);
        expect(stub.calledWith("people", source)).to.be.true;
    });
});

describe("tag", () => {

    it("should attach a tag", () => {

        const source = Observable
            .from(["alice", "bob"])
            .tag("people");

        expect(source).to.have.property("operator");
        expect(source["operator"]).to.have.property("tag", "people");
    });

    it("should do nothing else", () => {

        return Observable
            .from(["alice", "bob"])
            .tag("people")
            .toArray()
            .toPromise()
            .then((value) => {

                expect(value).to.deep.equal(["alice", "bob"]);
            });
    });
});