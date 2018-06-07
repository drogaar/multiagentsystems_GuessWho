// knows K, and ^, not ¬, or v, atomic p
expressiontypes = ["K1", "K2", "^", "¬", "v", "p"];
hairColours = ["red", "green", "blue"]
teethQuantities = ["0", "1", "2"]
crossEyed = ["true", "false"]

class World {
  constructor(chars) {
    this.characters = chars;
  }
  equal(world){
    return  this.characters[0].equal(world.characters[0]) &&
            this.characters[1].equal(world.characters[1]);
  }
  propositions(){
    // Returns the atomic (should be all?) propositions true in this world
    props = []
    for(var agent = 0; agent != 2; ++agent){
      chr = this.characters[agent]
      agentstr = "p" + (agent + 1).toString()
      props.append(agentstr + ".hair:"      + chr.hair)
      props.append(agentstr + ".crosseyed:" + chr.crosseyed)
      props.append(agentstr + ".teeth:"     + chr.teeth)
      props.append(agentstr + ".name:"      + chr.name)
    }
    return props
  }
  toString(){
    // A string representation of this object allows storing in dictionary
    return this.characters[0].name + this.characters[1].name;
  }
}

class Atom {
  // A proposition such as p1.hair:red
  constructor(prop_str){
    this.player     = parseInt(prop_str.split('.')[0][-1])  //index: (0,1)
    this.attribute  = prop_str.split('.')[1].split(':')[0]
    this.value      = prop_str.split(':')[-1]
  }
  toString(){
    return "p" + (this.player + 1) + "." + this.attribute + ":" + this.value;
  }
  type(){
    return "p";
  }
}

class KripkeModel {
  constructor() {
    // Worlds have a character for each player, defining relevant propositions.
    this.worlds = [];
    for(var p1 = 0; p1 != 4; ++p1)
      for(var p2 = 0; p2 != 4; ++p2)
        this.worlds.append(new World([str2char(images[p1], names[p1]),
                                str2char(images[p2], names[p2])]));

    // initialise empty relations
    this.relations = [{}, {}];  //for each agent a dict of relations
    for(var world = 0; world != worlds.length; ++world)
        for(var agent = 0; agent != 2; ++agent)
          this.relations[agent][world.hash] = [];

    // Relations are present when the local character is equal
    for(var world1 = 0; world1 != worlds.length; ++world1)
      for(var world2 = 0; world2 != worlds.length; ++world2)
        for(var agent = 0; agent != 2; ++agent)
          if(world1.characters[agent].equal(world2.characters[agent]))
            this.relations[agent][world1.hash].append(world2);
  }

  // Evaluate a proposition in given world
  evaluate(world, proposition){
    switch(proposition.type){
      case "p":
        console.log("checking: " + proposition.toString());
        console.log("props: " + world.propositions.toString());
        return world.propositions.includes(proposition.toString());

      case "¬":
        return !evaluate(world, proposition.operand());

      case "K1":
        worlds = this.relations[0][world.hash];
        truth = true;
        for (let reachableworld of worlds)
          truth = truth && evaluate(reachableworld, proposition.operand());
        return truth;

      case "K2":
        worlds = this.relations[1][world.hash];
        truth = true;
        for (let reachableworld of worlds)
          truth = truth && evaluate(reachableworld, proposition.operand());
        return truth;
    }
  }
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
