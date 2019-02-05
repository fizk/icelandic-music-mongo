export const transformSnapshot = (snapshot: any) => ({
    ...snapshot.data() ,
    updateTime: snapshot.updateTime,
    createTime: snapshot.createTime,
    _id: snapshot.id
});
