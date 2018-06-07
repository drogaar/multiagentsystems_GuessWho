// knows, and, not, or, atomic
expressiontypes = ["K", "^", "¬", "v", "a"];

class World {
  constructor(chars) {
    this.characters = chars;
  }

  equal(world){
    return  this.characters[0].equal(world.characters[0]) &&
            this.characters[1].equal(world.characters[1]);
  }

  // A string representation of this object allows storing in dictionary
  hash(){
    return this.characters[0].name + this.characters[1].name;
  }
}

class KripkeModel {
  constructor() {
    this.worlds = [];
    this.relations = [{}, {}];  //for each agent a dict of relations

    // Worlds have a character for each player, defining relevant propositions.
    for(var p1 = 0; p1 != 4; ++p1)
      for(var p2 = 0; p2 != 4; ++p2)
        this.worlds.append(new World([str2char(images[p1], names[p1]),
                                str2char(images[p2], names[p2])]));

    // Relations are present when the local character is equal
    for(var world1 = 0; world1 != worlds.length; ++world1)
      for(var world2 = 0; world2 != worlds.length; ++world2)
        for(var agent = 0; agent != 2; ++agent)
          if(world1.characters[agent].equal(world2.characters[agent]))
            this.relations[agent][world1.hash] = world2;
  }

  // Evaluate a proposition in given world
  // function evaluate(world, proposition){
  //   switch(proposition.type){
  //     case "a":
  //       return proposition.evaluate(character)
  //
  //
  //     case "K":
  //       return evaluate()
  //   }
  // }
}

/*
atom->evaluate(world)
*/



// function parseString(object_string){
//   if(object_string["remainder"] = "atom")
//
//   if(str.startsWith("K")){
//
//     Tree = {"remainder" : }
//     return ()
//   }
//
//   return {}
// }
