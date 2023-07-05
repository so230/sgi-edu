package sgi.edu.deom.memberService.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sgi.edu.deom.memberService.service.MockAccountGenerateService;

@RestController
@RequestMapping(value = "/mockaccount")
public class MockAccountController {
    private final MockAccountGenerateService dummyAccountGenerateService;

    public MockAccountController(MockAccountGenerateService dummyAccountGenerateService) {
        this.dummyAccountGenerateService = dummyAccountGenerateService;
    }

    @GetMapping("/generatedummyaccounts")
    public void generateDummyAccounts() {
        dummyAccountGenerateService.generateAccounts();
    }

}