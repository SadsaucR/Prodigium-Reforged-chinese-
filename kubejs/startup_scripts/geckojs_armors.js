StartupEvents.registry("item", (event) => {
  // Wizard Ignitium armor
  event
    .create("kubejs:wizard_ignitium_helmet", "anim_helmet")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/wizard_ignitium.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/wizard_ignitium.png");
    })
    .rarity("rare")
    .displayName("烈火石巫師帽")
    .tier("wizard_ignitium");

  event
    .create("kubejs:wizard_ignitium_chestplate", "anim_chestplate")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/wizard_ignitium.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/wizard_ignitium.png");
    })
    .rarity("rare")
    .displayName("烈火石巫師袍")
    .tier("wizard_ignitium");

  event
    .create("kubejs:wizard_ignitium_leggings", "anim_leggings")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/wizard_ignitium.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/wizard_ignitium.png");
    })
    .rarity("rare")
    .displayName("烈火石巫師褲")
    .tier("wizard_ignitium");

  event
    .create("kubejs:wizard_ignitium_boots", "anim_boots")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/wizard_ignitium.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/wizard_ignitium.png");
    })
    .rarity("rare")
    .displayName("烈火石巫師靴")
    .tier("wizard_ignitium");

  // Necro armor
  event
    .create("kubejs:necro_helmet", "anim_helmet")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/necro.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/necro.png");
    })
    .rarity("rare")
    .displayName("死靈頭盔")
    .tier("necro");

  event
    .create("kubejs:necro_chestplate", "anim_chestplate")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/necro.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/necro.png");
    })
    .rarity("rare")
    .displayName("死靈胸甲")
    .tier("necro");

  event
    .create("kubejs:necro_leggings", "anim_leggings")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/necro.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/necro.png");
    })
    .rarity("rare")
    .displayName("死靈護腿")
    .tier("necro");

  event
    .create("kubejs:necro_boots", "anim_boots")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/necro.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/necro.png");
    })
    .rarity("rare")
    .displayName("死靈靴")
    .tier("necro");

  // Skyjade Armor
  event
    .create("kubejs:skyjade_helmet", "anim_helmet")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/skyjade_armor.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/skyjade_armor.png");
    })
    .rarity("rare")
    .displayName("天玉帽")
    .tier("wizard_skyjade");

  event
    .create("kubejs:skyjade_chestplate", "anim_chestplate")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/skyjade_armor.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/skyjade_armor.png");
    })
    .rarity("rare")
    .displayName("天玉袍")
    .tier("wizard_skyjade");

  event
    .create("kubejs:skyjade_leggings", "anim_leggings")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/skyjade_armor.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/skyjade_armor.png");
    })
    .rarity("rare")
    .displayName("天玉褲")
    .tier("wizard_skyjade");

  event
    .create("kubejs:skyjade_boots", "anim_boots")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/skyjade_armor.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/skyjade_armor.png");
    })
    .rarity("rare")
    .displayName("天玉靴")
    .tier("wizard_skyjade");

  // Sol Armor
  event
    .create("kubejs:sol_chestplate", "anim_chestplate")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/sol.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/sol.png");
    })
    .rarity("rare")
    .displayName("太陽袍")
    .tier("sunbird");

  event
    .create("kubejs:sol_leggings", "anim_leggings")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/sol.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/sol.png");
    })
    .rarity("rare")
    .displayName("太陽褲")
    .tier("sunbird");

  event
    .create("kubejs:sol_boots", "anim_boots")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/sol.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/sol.png");
    })
    .rarity("rare")
    .displayName("太陽靴")
    .tier("sunbird");

  // Plated Valkyrie armor
  event
    .create("kubejs:plated_valkyrie_helmet", "anim_helmet")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/plated_valkyrie.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/plated_valkyrie.png");
      geo.setSimpleAnimation(
        "kubejs:animations/armor/plated_valkyrie.animation.json"
      );
    })
    .rarity("rare")
    .displayName("鐵甲女武神頭盔")
    .tier("plated_valkyrie");

  event
    .create("kubejs:plated_valkyrie_chestplate", "anim_chestplate")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/plated_valkyrie.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/plated_valkyrie.png");
      geo.setSimpleAnimation(
        "kubejs:animations/armor/plated_valkyrie.animation.json"
      );
    })
    .rarity("rare")
    .displayName("鐵甲女武神胸甲")
    .tier("plated_valkyrie");

  event
    .create("kubejs:plated_valkyrie_leggings", "leggings")
    .rarity("rare")
    .displayName("鐵甲女武神護腿")
    .tier("plated_valkyrie");

  event
    .create("kubejs:plated_valkyrie_boots", "anim_boots")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/plated_valkyrie.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/plated_valkyrie.png");
      geo.setSimpleAnimation(
        "kubejs:animations/armor/plated_valkyrie.animation.json"
      );
    })
    .rarity("rare")
    .displayName("鐵甲女武神靴")
    .tier("plated_valkyrie");

  // Bee Armor
  event
    .create("kubejs:bee_helmet", "anim_helmet")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/thebeetop.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/beearmor.png");
      geo.setSimpleAnimation("kubejs:animations/armor/thebee.animation.json");
    })
    .rarity("rare")
    .displayName("蜜蜂頭盔")
    .tier("bee");

  event
    .create("kubejs:bee_chestplate", "anim_chestplate")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/thebeetop.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/beearmor.png");
      geo.setSimpleAnimation("kubejs:animations/armor/thebee.animation.json");
    })
    .rarity("rare")
    .displayName("蜜蜂胸甲")
    .tier("bee");

  event
    .create("bee_leggings", "leggings")
    .rarity("rare")
    .displayName("蜜蜂護腿")
    .tier("bee");

  event
    .create("kubejs:bee_boots", "anim_boots")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/thebeetop.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/beearmor.png");
      geo.setSimpleAnimation("kubejs:animations/armor/thebee.animation.json");
    })
    .rarity("rare")
    .displayName("蜜蜂靴")
    .tier("bee");

  // Ranger Phoenix armor
  event
    .create("kubejs:phoenix_ranger_helmet", "anim_helmet")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/phoenix_ranger.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/phoenix_ranger.png");
    })
    .rarity("rare")
    .displayName("鳳凰遊俠頭盔")
    .tier("phoenix_ranger");

  event
    .create("kubejs:phoenix_ranger_chestplate", "anim_chestplate")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/phoenix_ranger.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/phoenix_ranger.png");
    })
    .rarity("rare")
    .displayName("鳳凰遊俠胸甲")
    .tier("phoenix_ranger");

  event
    .create("kubejs:phoenix_ranger_leggings", "anim_leggings")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/phoenix_ranger.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/phoenix_ranger.png");
    })
    .rarity("rare")
    .displayName("鳳凰遊俠護腿")
    .tier("phoenix_ranger");

  event
    .create("kubejs:phoenix_ranger_boots", "anim_boots")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/phoenix_ranger.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/phoenix_ranger.png");
    })
    .rarity("rare")
    .displayName("鳳凰遊俠靴")
    .tier("phoenix_ranger");

  // Frost Armor
  event
    .create("frost_helmet", "anim_helmet")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/frost_armor.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/frost.png");
    })
    .rarity("rare")
    .displayName("寒霜兜帽")
    .tier("frost");

  event
    .create("kubejs:frost_chestplate", "anim_chestplate")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/frost_armor.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/frost.png");
    })
    .rarity("rare")
    .displayName("寒霜胸甲")
    .tier("frost");

  event
    .create("kubejs:frost_leggings", "anim_leggings")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/frost_armor.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/frost.png");
    })
    .rarity("rare")
    .displayName("寒霜護腿")
    .tier("frost");

  event
    .create("kubejs:frost_boots", "anim_boots")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/frost_armor.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/frost.png");
    })
    .rarity("rare")
    .displayName("寒霜靴")
    .tier("frost");

  // Scaled Armor
  event
    .create("scaled_helmet", "anim_helmet")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/scaled_armor.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/scaled.png");
    })
    .rarity("rare")
    .displayName("鱗甲頭盔")
    .tier("scaled");

  event
    .create("kubejs:scaled_chestplate", "anim_chestplate")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/scaled_armor.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/scaled.png");
    })
    .rarity("rare")
    .displayName("鱗甲胸甲")
    .tier("scaled");

  event
    .create("kubejs:scaled_leggings", "anim_leggings")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/scaled_armor.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/scaled.png");
    })
    .rarity("rare")
    .displayName("鱗甲護腿")
    .tier("scaled");

  event
    .create("kubejs:scaled_boots", "anim_boots")
    .geoModel((geo) => {
      geo.setSimpleModel("kubejs:geo/armor/scaled_armor.geo.json");
      geo.setSimpleTexture("kubejs:textures/armor/scaled.png");
    })
    .rarity("rare")
    .displayName("鱗甲靴")
    .tier("scaled");
});
