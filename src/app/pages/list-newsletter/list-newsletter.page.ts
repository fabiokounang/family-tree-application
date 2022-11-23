import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-newsletter',
  templateUrl: './list-newsletter.page.html',
  styleUrls: ['./list-newsletter.page.scss'],
})
export class ListNewsletterPage implements OnInit {
  newsletter: any[] = [
    {
      id: 1,
      title: 'Lorem ipsum dolor sit! Lorem ipsum dolor sit amet 1',
      image: 'https://indonesiakaya.com/wp-content/uploads/2020/10/Vihara_Avalokitesvara_1200.jpg',
      subtitle: 'Lorem ipsum dolor sit amet elit. Velit, odit!',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus eligendi vel provident labore nobis nemo repellat sapiente consectetur facere, ea, quos qui aliquid laboriosam! Doloremque esse nobis sunt laborum quia tempore voluptate beatae quaerat nihil maxime, adipisci minima quis voluptatem aperiam, excepturi minus eligendi nulla illum ipsum! Fuga, inventore similique.'
    },
    {
      id: 2,
      title: 'Lorem ipsum dolor sit! Lorem ipsum dolor sit amet 2',
      image: 'https://cdn.idntimes.com/content-images/community/2021/12/96521993-142209634034169-2865139566091318520-n-b9525602b7a0cdcf30573dba18d33241-d4e0dfd50b19b9ddb30b6af051b36a46.jpg',
      subtitle: 'Lorem ipsum dolor sit amet elit. Velit, odit!',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus eligendi vel provident labore nobis nemo repellat sapiente consectetur facere, ea, quos qui aliquid laboriosam! Doloremque esse nobis sunt laborum quia tempore voluptate beatae quaerat nihil maxime, adipisci minima quis voluptatem aperiam, excepturi minus eligendi nulla illum ipsum! Fuga, inventore similique.'
    },
    {
      id: 3,
      title: 'Lorem ipsum dolor sit! Lorem ipsum dolor sit amet 3',
      image: 'https://www.thecolonyhotelbali.com/wp-content/uploads/2018/02/Vihara-Dharmayana.jpg',
      subtitle: 'Lorem ipsum dolor sit amet elit. Velit, odit!',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus eligendi vel provident labore nobis nemo repellat sapiente consectetur facere, ea, quos qui aliquid laboriosam! Doloremque esse nobis sunt laborum quia tempore voluptate beatae quaerat nihil maxime, adipisci minima quis voluptatem aperiam, excepturi minus eligendi nulla illum ipsum! Fuga, inventore similique.'
    },
    {
      id: 4,
      title: 'Lorem ipsum dolor sit! Lorem ipsum dolor sit amet 4',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY8_ZgQnFCHxCGSOlGHTaLha-8wImNgTyYsg&usqp=CAU',
      subtitle: 'Lorem ipsum dolor sit amet elit. Velit, odit!',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus eligendi vel provident labore nobis nemo repellat sapiente consectetur facere, ea, quos qui aliquid laboriosam! Doloremque esse nobis sunt laborum quia tempore voluptate beatae quaerat nihil maxime, adipisci minima quis voluptatem aperiam, excepturi minus eligendi nulla illum ipsum! Fuga, inventore similique.'
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
