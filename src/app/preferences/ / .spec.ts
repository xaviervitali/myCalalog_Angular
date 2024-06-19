import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import {  } from "./ ";

describe("", () => {
    let comp: ;
    let fixture: ComponentFixture<>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [  ],
            schemas: [ NO_ERRORS_SCHEMA ]
        });
        fixture = TestBed.createComponent();
        comp = fixture.componentInstance;
    });

    it("can load instance", () => {
        expect(comp).toBeTruthy();
    });

});