// Create a reference to the model
let InventoryModel = require('../models/inventory');

module.exports.inventoryList = function(req, res, next){

    InventoryModel.find( (err, inventoryList)=>{

        if(err){
            return console.error(err);
        }
        else{
            // console.log(inventoryList);
            res.render(
                'list', 
                { 
                  title: 'Inventory List',
                  InventoryList: inventoryList,
                  userName: req.user ? req.user.username : ''
                }
              );

        }

    })    

}


module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    InventoryModel.findById(id, (err, itemToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('add_edit', {
                title: 'Edit Item', 
                item: itemToEdit,
                userName: req.user ? req.user.username : ''
            })
        }
    });
}


module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedItem = InventoryModel({
         _id: req.body.id,
        Name: req.body.Name,
        ContactNumber: req.body.Number,
        EmailAddress: req.body.Email 
    });

    // console.log(updatedItem);

    InventoryModel.updateOne({_id: id}, updatedItem, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // console.log(req.body);
            // refresh the book list
            res.redirect('/inventory/list');
        }
    });
}


module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    InventoryModel.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/inventory/list');
        }
    });
}



module.exports.displayAddPage = (req, res, next) => {
    let newItem = InventoryModel();

    res.render('add_edit', {
        title: 'Add a new Item',
        item: newItem,
        userName: req.user ? req.user.username : ''
    })          
}

module.exports.processAddPage = (req, res, next) => {

    let newItem = InventoryModel({
        _id: req.body.id,
        Name: req.body.Name,
        ContactNumber: req.body.Number,
        EmailAddress: req.body.Email 
        
    });

    InventoryModel.create(newItem, (err, item) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            console.log(item);
            res.redirect('list');
        }
    });

}

