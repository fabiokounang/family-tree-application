import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import FamilyTree from "@balkangraph/familytree.js";
import { UserInterface } from 'src/app/interfaces/user.interface';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.services';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.page.html',
  styleUrls: ['./tree.page.scss'],
})
export class TreePage implements OnInit {
  loader: boolean = false;
  trees: any[] = [];
  user: any = null;
  familyTree: any = [];
  tree: any = null;
  users: any = [];

  constructor (private apiService: ApiService, private sharedService: SharedService) { }

  ngOnInit() {
  }

  ionViewWillEnter () {
    this.tree = document.getElementById('tree');
    this.fillData();
    this.getAllUser();
  }

  fillData () {
    this.user = this.sharedService.getLocalStorage();
  }

  getAllUser () {
    this.apiService.connection('master-user').subscribe({
      next: (response: any) => {
        this.users = response.values;
        this.getFamilyTree();
      },
      error: (error : HttpErrorResponse) => {
        this.sharedService.callAlert(!error.error ? error : error.error);
        this.loader = false;
      },
      complete: () => {
        this.loader = false;
      }
    });
  }

  getFamilyTree () {
    this.apiService.connection('master-tree').subscribe({
      next: (response: any) => {
        this.familyTree = response.data;
        this.makeTree();
      },
      error: (error : HttpErrorResponse) => {
        this.sharedService.callAlert(!error.error ? error : error.error);
        this.loader = false;
      },
      complete: () => {
        this.loader = false;
      }
    });
  }

  makeTree () {
    console.log(this.users)
    const family = new FamilyTree(this.tree, {
      mode: 'light',
      template: 'hugo',
      toolbar: { zoom: true, fit: true },
      nodeBinding: { field_0: 'name', field_1: 'born', img_0: 'photo' },
      nodeMenu: {
        edit: { text: 'Edit' },
        details: { text: 'Details' }
      },
      editForm: {
        titleBinding: "name",
        photoBinding: "photo",
        elements: []
      },
      nodeTreeMenu: true
    });

    family.on('add', (sender, args) => {
      console.log(sender, args, 'add');
    });

    family.on('added', (sender, args) => {
    });

    family.on('update', (sender, args) => {
      if (args.updateNodesData.name) this.createOrUpdate(args.updateNodesData[0].username);
    });


    family.on('field', function (sender, args) {
      if (args.name == 'born') {
        var date = new Date(args.value);
        args.value = date.toLocaleDateString();
      }
    });

    this.familyTree = this.familyTree.map((tree) => {
      return {
        id: tree._id,
        pids: [],
        name: tree.user.first_name_latin + ' ' + tree.user.last_name_latin,
        gender: tree.user.gender == 1 ? 'Male' : 'Female',
        photo: tree.user.image || "https://cdn.balkan.app/shared/2.jpg",
        born: tree.user.date_of_birth
      }
    });

    family.load(this.familyTree);
    // { id: 1, pids: [2], name: "Amber McKenzie", gender: "female", photo: "https://cdn.balkan.app/shared/2.jpg",  born: '1954-09-29'  },
    // // { id: 2, pids: [1], name: "Ava Field", gender: "male", photo: "https://cdn.balkan.app/shared/m30/5.jpg",  born: '1954-09-29' },
    // // { id: 3, mid: 1, fid: 2, name: "Peter Stevens", gender: "male", photo: "https://cdn.balkan.app/shared/m10/2.jpg",  born: '1954-09-29' },
    // // { id: 4, mid: 1, fid: 2, name: "Savin Stevens", gender: "male", photo: "https://cdn.balkan.app/shared/m10/1.jpg",  born: '1954-09-29'  },
    // // { id: 5, mid: 1, fid: 2, name: "Emma Stevens", gender: "female", photo: "https://cdn.balkan.app/shared/w10/3.jpg",  born: '1954-09-29' }
  }

  createOrUpdate (username) {
    this.loader = true;
    this.apiService.connection('master-tree-create').subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error : HttpErrorResponse) => {
        this.sharedService.callAlert(!error.error ? error : error.error);
        this.loader = false;
      },
      complete: () => {
        this.loader = false;
      }
    });
  }

}
