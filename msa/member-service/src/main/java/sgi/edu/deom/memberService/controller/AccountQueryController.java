package sgi.edu.deom.memberService.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sgi.edu.deom.memberService.domain.entity.Account;
import sgi.edu.deom.memberService.service.AccountQueryService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/member")
public class AccountQueryController {

    private final AccountQueryService accountQueryService;

    public AccountQueryController(AccountQueryService accountQueryService) {
        this.accountQueryService = accountQueryService;
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<Account> getAccountById(@PathVariable(value = "accountId") Long accountId) {
        Optional<Account> accountOpt = accountQueryService.getAccountById(accountId);
        return accountOpt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/list")
    public List<Account> getAccounts() {
        return accountQueryService.getAccounts();
    }

    @PostMapping("/{accountId}/{company}")
    public Account updateCompany(@PathVariable(value = "accountId") Long accountId, @PathVariable(value = "company") String company){
        return accountQueryService.updateCompany(accountId, company);
    }

}