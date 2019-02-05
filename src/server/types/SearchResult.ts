import {GraphQLUnionType} from "graphql";
import Group from "./Group";
import Person from "./Person";
import Collection from "./Collection";
import Item from "./Item";

export default new GraphQLUnionType({
    name: 'SearchResult',
    types: [Group, Person, Collection, Item],
    resolveType: data => {
        if (data.__contentType.match(/^artist\/person/)) {
            return Person;
        } else if (data.__contentType.match(/^artist\/group/)) {
            return Group;
        } else if (data.__contentType.match(/^collection/)) {
            return Collection;
        } else if (data.__contentType.match(/^item/)) {
            return Item;
        } else {
            return null;
        }
    }
});
