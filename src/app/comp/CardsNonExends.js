import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import DrawerUndocked from "./Drawers";
import DrawerOpenRight from "./RightDrawer";

const styles = {
  leftButton: {
      float: "left"
  },
    rightButton:{
      float: "right"
    }
};

const CardWithAvatar = (name) => (
    <Card>
        <CardHeader
            title={name}
            subtitle={"This person name is: "+name}
            avatar="https://assets.entrepreneur.com/content/3x2/1300/1413823428-amazingly-free-stock-websites.jpg?width=750&crop=16:9"
        />
        <CardMedia
            overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
        >
            <img src="https://images.unsplash.com/photo-1507853610001-fd5951595eaf?ixlib=rb-0.3.5&s=83c95c479220b6cf95130ef85478ce74&auto=format&fit=crop&w=967&q=80" alt="" />
        </CardMedia>
        <CardTitle title="Card title" subtitle="Card subtitle" />
        <CardText>Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah
        </CardText>
        <CardActions>
            <DrawerUndocked styling={styles.leftButton} />
            <DrawerOpenRight styling= {styles.rightButton} />
        </CardActions>
    </Card>
);

export default CardWithAvatar;