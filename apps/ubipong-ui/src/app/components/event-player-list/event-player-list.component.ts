import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Player } from '../../models/player'
import { RoundRobinGroup } from '../../models/round-robin-group'

@Component({
  selector: 'app-event-player-list',
  templateUrl: './event-player-list.component.html',
  styleUrls: ['./event-player-list.component.scss']
})
export class EventPlayerListComponent implements OnInit {
  playerList: Player[] = [
    {
      name: "player 1",
      club: "club 1",
      rating: 1001,
    },
    {
      name: "player 2",
      club: "club 2",
      rating: 1002,
    },
    {
      name: "player 3",
      club: "club 3",
      rating: 1003,
    },
    {
      name: "player 4",
      club: "club 4",
      rating: 1004,
    },
  ];

  newName = '';
  newClub = '';
  newRating = '';

  sortedByRating = true;

  roundRobinGroupList: RoundRobinGroup[] = [
    {
      eventId: 1,
      groupNumber: 1,
      playerList: [
        {
          name: "player 1",
          club: "club 1",
          rating: 1001,
        },
        {
          name: "player 2",
          club: "club 2",
          rating: 1002,
        },
      ]
    },
    {
      eventId: 2,
      groupNumber: 2,
      playerList: [
        {
          name: "player 3",
          club: "club 3",
          rating: 1003,
        },
        {
          name: "player 4",
          club: "club 4",
          rating: 1004,
        },
      ]
    },
  ]

  constructor() { }

  ngOnInit() {
  }

  addPlayer(name: string = this.newName,
    club: string = this.newClub, rating: string = this.newRating) {
    const player = new Player();
    player.name = name;
    player.club = club;
    player.rating = parseInt(rating);
    this.playerList.push(player);

    if (this.sortedByRating) {
      this.sortPlayerListByRating();
    }

    this.newName = '';
    this.newClub = '';
    this.newRating = '';
  }

  sortPlayerListByRating() {
    this.playerList.sort((a, b) => {
      if (!a.rating && !b.rating) {
        return 1;
      } else if(!a.rating) {
        return 1;
      } else if(!b.rating) {
        return -1;
      } else {
        return b.rating - a.rating;
      }
    });
  }

  deletePlayer(index: number) {
    this.playerList.splice(index, 1);
  }

  copyPlayerToClipboard(p: Player) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = p.name;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  calculateNumberOfGroups(groupSize: number) {
    return Math.ceil(this.playerList.length / groupSize);
  }

  ensureRoundRobinGroup(groupIndex: number): RoundRobinGroup {
    if (!this.roundRobinGroupList[groupIndex]) {
      const newGroup = new RoundRobinGroup();
      newGroup.groupNumber = groupIndex + 1;
      newGroup.playerList = [];
      this.roundRobinGroupList[groupIndex] = newGroup;
      return newGroup;
    } else {
      return this.roundRobinGroupList[groupIndex];
    }
  }

  createGroupList(groupSize: number) {
    var groupIndex = 0;
    var direction = 1;
    const numberOfGroups = this.calculateNumberOfGroups(groupSize);

    // clear list first
    this.roundRobinGroupList = [];

    this.playerList.forEach(p => {
      const existingGroup = this.ensureRoundRobinGroup(groupIndex);
      existingGroup.playerList.push(p);

      // zigzag pattern:
      // index goes from 0 to numberOfGroups - 1 and back to 0
      if (direction == 1) {
        if (groupIndex >= numberOfGroups - 1) {
          direction = -1;
        } else {
          groupIndex = groupIndex + direction;
        }
      } else {
        if (groupIndex <= 0) {
          direction = 1;
        } else {
          groupIndex = groupIndex + direction;
        }
      }
  });
  }

  toggleSortedByRating(): void {
    this.sortedByRating = !this.sortedByRating;
  }

  getAllPlayersAsString(roundRobinGroup: RoundRobinGroup) {
    return roundRobinGroup.playerList.map(p => p.name).join('\n');
  }

  copyGroupToClipboard(roundRobinGroup: RoundRobinGroup) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.getAllPlayersAsString(roundRobinGroup);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
