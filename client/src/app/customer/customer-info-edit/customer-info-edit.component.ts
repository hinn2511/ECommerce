import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-customer-info-edit',
  templateUrl: './customer-info-edit.component.html',
  styleUrls: ['./customer-info-edit.component.css']
})
export class CustomerInfoEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  member: Member;
  user: User;

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  
  constructor(private accountService: AccountService, private memberService: MemberService,
    private toastr: ToastrService, private confirmService: ConfirmService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

  ngOnInit(): void {
    this.getCustomerInfo();
  }

  getCustomerInfo() {
    this.memberService.getMember().subscribe(result => {
      this.member = result;
    })
  }

  updateCustomer() {
    console.log(this.member);
    this.memberService.updateMember(this.member).subscribe(result => {
      this.toastr.success('Thông tin đã được cập nhật!');
      this.editForm.reset(this.member);
    })
  }
}
