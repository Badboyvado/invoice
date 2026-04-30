// import logo from './logo.svg';
import './App.css';
import   { useState, useEffect} from "react";
// counter component

// function Counter() {
//   const [count, setCount] = useState(0);
//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>Click me</button>
//     </div>
//   )
// };

/*Function helper */  

 function calcTotal(items) {
  return items.reduce((sum, item) => sum + item.quantity  * item.price, 0);
  

 }
//  Generate a random ID like "RT3080"
 function generateId() {
  const letters =  "ABCDEFGHIJKLMNOPQRSTUWXYZ";
  const l1 = letters[Math.floor(Math.random() * 26)];
  const l2 = letters[Math.floor(Math.random() * 26)];
  const nums = String(Math.floor(Math.random() * 9000) +  1000);
  return `${l1}${l2}${nums}`;
 }
//  Gets today's  date as "YYYY-MM=DD"
 function todayStr() {
  return new Date().toISOString().split("T")[0];
 }

  const SEED_INVOICES = [
    { 
      id: "RT3080", status:"paid", createdAt: "2021-08-18",
      paymentTerms: 1, dueDate: "2021-08-19",
      clientName:"Jensen Huang", clientEmail: "rilitaiwo12@gmail.com",
      clientAddress: {street: "106 Kendell Street", city: "Sharrington", postCode: "NR24 5WQ", country: "United Kingdom"},
      senderAddress: { street: "19 Union Terrace", city: "London", postCode: "E1 3EZ", country: "United Kingdom"},
      description: "Re: Branding Guidelines",
      items: [{ name:  "Brand Guidelines", quantity: 1, price: 1800.90 }],
    },
    { 
      id: "XM9141", status: "pending", createdAt: "2021-08-21", 
      paymentTerms: 30, dueDate: "2021-09-20",
      clientName:"Alex Grim", clientEmail: "moTaiwo20@gmail.com",
      clientAddress: { street: "84 Church Way", city: "Bradford", postCode: "BD1 9PB", country: "United Kingdom"},
      senderAddress: { street: "19 Union Terrace", city: "London", postCode: "E1 3EZ", country: "United Kingdom"},
      description: "Fashion Design",
      items: [
        {name: "Wedding Design", quantity: 2,  price: 156},
        {name: "Graduation Design", quantity: 4, price: 200}
      ],
    },
    { 
      id: "RG0314", status: "draft", createdAt: "2021-09-24",
      paymentTerms: 7, dueDate: "2021-10-01",
      clientName: "John Morrison", clientEmail: "faruqadekunle@gmail.com",
      clientAddress: { street: "79 Dove Road", city: "Westhall", postCode: "IP19 3PF", country: "United Kingdom"},
      senderAddress: { street: "19 Union Terrace", city: "London", postCode: "E1 3EZ", country: "United Kingdom"},
      description: "Webtoon Redesign",
      items: [{ name: "Webtoon Redesign", quantity: 1, price: 14002.33 }],
    },
  ];

// Form State 
 const emptyForm = ()=> ({
  senderStreet: "", senderCity: "", senderPostCode: "", senderCountry: "",
  clientName: "", clientEmail: "",
  clientStreet: "", clientCity: "", clientPostCode: "", clientCountry: "",
  createdAt: todayStr(),
  paymentTerms: 30,
  description: "",
  items: [{ name: "", quantity: 1, price: 0 }],
 });

 // Badges 
 function Badge({status}) {
  // Define colours for each status
  const styles = {
    paid: {
      background: "rgba(51, 214, 159, 0.1)",
      color: "#33D69F",
    },
    pending: {
      background: "rgba(255, 143, 0, 0.1)",
      color: "#FF8F00",
    },
    draft: {
      background: "rgba(55, 59, 83, 0.1)", 
      color:   "var(--draft-color)", 
    },
  };
  // Pick the right style based on the status prop 
  const currentStyle = styles[status] || styles.draft;

  return (
    <span style={{
      ...currentStyle,
      padding: "8px 16px",
      borderRadius: "6px",
      fontWeight: "700",
      fontSize: "12px",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
    }}>
      {/* The coloured dot*/}
      <span style={{
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        background: currentStyle.color,
        display: "inline-block"
      }}/>
      {/* Capitalise first letter*/}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );

 }

//  The InvoiceForm 
 function InvoiceForm({onClose, onSave, invoice}) {
  const [form, setForm] = useState(()=> {
     if (invoice){
    // pre-fill form  with existing invoice data
      return {
       senderStreet: invoice.senderAddress?.street || "",
       senderCity: invoice.senderAddress?.city || "",
       senderPostCode: invoice.senderAddress?.postCode || "",
       senderCountry: invoice.senderAddress?.country || "",
       clientName: invoice.clientName || "",
       clientEmail: invoice.clientEmail || "",
       clientStreet: invoice.clientAddress?.street || "",
       clientCity: invoice.clientAddress?.city || "",
       clientPostCode: invoice.clientAddress?.postCode || "",
       clientCountry: invoice.clientAddress?.country || "",
       createdAt: invoice.createdAt || todayStr(),
       paymentTerms: invoice.paymentTerms ||  30,
       description: invoice.description || "",
       items: invoice.items || [{name: "", quantity: 1, price: 0}],
      };
    }
  return emptyForm()
  });
  const [errors, setErrors] = useState({});

  // Updates a single field in the form object
  const setField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value}));
  };

  //Updates a sinle field inside a specific item
  const setItemField = (index, field, value) => {
    setForm(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i  === index ? {...item, [field]: value} : item)
    }))
  };
  const addItem = () => {
    setForm(prev => ({
      ...prev,
      items: [...prev.items, {name: "", quantity: 1, price: 0}]
    }));
  };

  const removeItem =  (index) => {
    setForm(prev => ({
      ...prev,
      items: prev.items.filter(( _, i) => i !==  index)
    }));
  };

  //Continue from validation 

  //Validation
  const validate = () => {
    const errs = {};
    if (!form.clientName.trim()) errs.clientName ="Required";
    if (!form.clientEmail.trim()) errs.clientEmail = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.clientEmail)) errs.clientEmail = "Invalid email";

    if (!form.description.trim()) errs.description = "Required";
    if (!form.senderStreet.trim()) errs.senderStreet = "Required";
    if (!form.clientStreet.trim())  errs.clientStreet = "Required";
    if  (form.items.length === 0) errs.items ="Add at least one item";
    form.items.forEach((item, i) => {
      if (!item.name.trim()) errs[`item_name_${i}`] = "Required";
      if (item.quantity <= 0) errs[`item_qty_${i}`] = "Invalid";
      if (item.price < 0) errs[`item_price_${i}`] = "Invalid";
    });
    return  errs;    
  }
  // Build invoices object from form data
  const buildInvoice = (status) => ({
    id: generateId(),
    status,
    createdAt: form.createdAt,
    paymentTerms: parseInt(form.paymentTerms),
    dueDate: (() => {
      const d = new Date(form.createdAt);
      d.setDate(d.getDate() + parseInt(form.paymentTerms));
      return d.toISOString().split("T")[0]; 
    })(),
    clientName: form.clientName,
    clientEmail: form.clientEmail,
    clientAddress: {
      street: form.clientStreet, city: form.clientCity,
      postCode: form.clientPostCode, country: form.clientCountry,
    },
    senderAddress:{
      street: form.senderStreet, city: form.senderCity,
      postCode: form.senderPostCode, country: form.senderCountry,
    },
    description: form.description,
    items: form.items.map(item => ({
      name: item.name,
      quantity: parseFloat(item.quantity),
      price: parseFloat(item.price),
    })),
  });
  const handleSaveDraft = () => {

    const built = buildInvoice("draft");
    if(invoice) built.id  = invoice.id;
    onSave(built)
  };
  const handleSend = () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      const built = buildInvoice(invoice ? invoice.status : "pending");
      // Keep original ID if editing
      if (invoice) built.id =  invoice.id;
      onSave(built);
    }
  };
  return (
    <div className='form-overlay' onClick={onClose}>
      <div className='form-drawer' onClick={e  => e.stopPropagation()}>
        <h2>{invoice ? `Edit #${invoice.id}` : "New Invoice"}</h2>
        {/*Bill form  */}
        <p className='form-section-label'>Bill Form</p>
        <div className='form-field'>
          <label>Street Address</label>
          <input
           value={form.senderStreet}
           onChange={e => setField("senderStreet", e.target.value)}
           className={errors.senderStreet ? "input-error" : ""}
           />
           {errors.senderStreet && 
            <span className='error-msg'>{errors.senderStreet}</span>}
        </div>
        <div className="form-row-3">
          <div className="form-field">
            <label>City</label>
            <input value={form.senderCity}
              onChange={e => setField("senderCity", e.target.value)} />
          </div>
          <div className="form-field">
            <label>Post Code</label>
            <input value={form.senderPostCode}
              onChange={e => setField("senderPostCode", e.target.value)} />
          </div>
          <div className="form-field">
            <label>Country</label>
            <input value={form.senderCountry}
              onChange={e => setField("senderCountry", e.target.value)} />
          </div>
        </div>

        {/* Bill To */}
        <p className="form-section-label" style={{ marginTop: "32px" }}>
          Bill To
        </p>
        <div className="form-field">
          <label>Client Name</label>
          <input value={form.clientName}
            onChange={e => setField("clientName", e.target.value)}
            className={errors.clientName ? "input-error" : ""}
          />
          {errors.clientName &&
            <span className="error-msg">{errors.clientName}</span>}
        </div>
        <div className="form-field">
          <label>Client Email</label>
          <input value={form.clientEmail}
            onChange={e => setField("clientEmail", e.target.value)}
            className={errors.clientEmail ? "input-error" : ""}
          />
          {errors.clientEmail &&
            <span className="error-msg">{errors.clientEmail}</span>}
        </div>
        <div className="form-field">
          <label>Street Address</label>
          <input value={form.clientStreet}
            onChange={e => setField("clientStreet", e.target.value)}
            className={errors.clientStreet ? "input-error" : ""}
          />
          {errors.clientStreet &&
            <span className="error-msg">{errors.clientStreet}</span>}
        </div>
        <div className="form-row-3">
          <div className="form-field">
            <label>City</label>
            <input value={form.clientCity}
              onChange={e => setField("clientCity", e.target.value)} />
          </div>
          <div className="form-field">
            <label>Post Code</label>
            <input value={form.clientPostCode}
              onChange={e => setField("clientPostCode", e.target.value)} />
          </div>
          <div className="form-field">
            <label>Country</label>
            <input value={form.clientCountry}
              onChange={e => setField("clientCountry", e.target.value)} />
          </div>
        </div>

        {/* Date & Terms */}
        <div className="form-row-2" style={{ marginTop: "16px" }}>
          <div className="form-field">
            <label>Invoice Date</label>
            <input type="date" value={form.createdAt}
              onChange={e => setField("createdAt", e.target.value)} />
          </div>
          <div className="form-field">
            <label>Payment Terms</label>
            <select value={form.paymentTerms}
              onChange={e => setField("paymentTerms", e.target.value)}>
              <option value={1}>Net 1 Day</option>
              <option value={7}>Net 7 Days</option>
              <option value={14}>Net 14 Days</option>
              <option value={30}>Net 30 Days</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="form-field">
          <label>Project Description</label>
          <input value={form.description}
            onChange={e => setField("description", e.target.value)}
            className={errors.description ? "input-error" : ""}
          />
          {errors.description &&
            <span className="error-msg">{errors.description}</span>}
        </div>

        {/* Items */}
        <p className="form-section-label" style={{ marginTop: "32px" }}>
          Item List
        </p>
        {errors.items &&
          <span className="error-msg">{errors.items}</span>}

        {form.items.map((item, i) => (
          <div className="item-row" key={i}>
            <div className="form-field" style={{ flex: 2 }}>
              <label>Item Name</label>
              <input value={item.name}
                onChange={e => setItemField(i, "name", e.target.value)}
                className={errors[`item_name_${i}`] ? "input-error" : ""}
              />
            </div>
            <div className="form-field" style={{ flex: 1 }}>
              <label>Qty</label>
              <input type="number" value={item.quantity} min="1"
                onChange={e => setItemField(i, "quantity", e.target.value)}
                className={errors[`item_qty_${i}`] ? "input-error" : ""}
              />
            </div>
            <div className="form-field" style={{ flex: 1 }}>
              <label>Price</label>
              <input type="number" value={item.price} min="0"
                onChange={e => setItemField(i, "price", e.target.value)}
                className={errors[`item_price_${i}`] ? "input-error" : ""}
              />
            </div>
            <div className="form-field" style={{ flex: 1 }}>
              <label>Total</label>
              <p style={{ paddingTop: "16px", fontWeight: "700" }}>
                £{(item.quantity * item.price).toFixed(2)}
              </p>
            </div>
            <button
              className="btn-remove"
              onClick={() => removeItem(i)}
            >✕</button>
          </div>
        ))}

        <button
          className="btn btn-ghost"
          style={{ width: "100%", marginTop: "16px" }}
          onClick={addItem}
        >
          + Add New Item
        </button>

        {/* Footer Buttons */}
        <div className="form-footer">
          <button className="btn btn-ghost" onClick={onClose}>
            Discard
          </button>
          <button className="btn btn-dark" onClick={handleSaveDraft}>
            Save as Draft
          </button>
          <button className="btn btn-primary" onClick={handleSend}>
            Save & Send
          </button>
        </div>

      </div>
    </div>
  );
}
//  Filter
 function DeleteModal({invoiceId, onConfirm, onCancel}) {
  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <h2>Confirm Deletion</h2>
        <p>
          Are you sure you want to delete invoice #{invoiceId}?
          This action cannot be undone.
        </p>
        <div className='modal-actions'>
          <button className='btn btn-ghost' onClick={onCancel}>
            Cancel
          </button>
          <button className='btn btn-danger' onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  )
 }
 function  FilterDropdown({ selectedFilters, onToggle, isOpen, onToggleOpen}) {
  const statuses = ["draft", "pending", "paid"];

  return (
    <div style={{ position: "relative"}}>
      {/* The button that opens/closes the dropdown*/}
      <button 
      className='btn btn-ghost' 
      onClick={onToggleOpen} 
      style={{display: "flex", alignItems: "center", gap:"8px"}}
      >
        Filter by status
        <span style={{
          display: "inline-block",
          transition: "transorm 0.2s",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
        }}>▾</span>
      </button>

      {/* The dropdown- only shows when isOpen is true */}
      {isOpen && (
        <div className='filter-dropdown'>
          {statuses.map(status => (
            <label key={status} className='filter-option'>
              <div 
                className={`filter-checkbox ${selectedFilters.includes(status) ? "checked" : ""}`}
                onClick={() => onToggle(status)}
              />
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </label>
          ))}
        </div>
      )}
    </div>
  );
 }

//  InvoiceCard
function InvoiceCard({id, clientName, status, dueDate, onClick, amount})  {
  return (
    <div className="invoice-card"onClick={onClick}>
      <p className='invoice-id'><span>#</span>{id}</p>
      <p  className='invoice-client'>{clientName}</p>
      <p className='invoice-due'>Due {dueDate}</p>
      <p className='invoice-amount'>£{amount}</p>
      <Badge status= {status}/>
    </div>
  );
}
// A separate component just for  the detail screens
// Invoice Detail
 function InvoiceDetail ({ invoice, onBack, onEdit, onDelete, onMarkPaid}) {
  const total = calcTotal(invoice.items);

  return (
      <div>
        <button className='back-btn' onClick={onBack}> Go back</button>
        
        <div className='detail-status-bar'>
          <div style={{ display: 'flex', alignItems: "center", gap: "16px"}}>
            <span style={{fontSize: "12px", color: "#888EB0"}}>Status</span>
            <Badge status={invoice.status}/>
          </div>
          <div className='detail-actions'>
            <button className='btn btn-ghost' onClick={onEdit}>Edit</button>
            <button className='btn btn-danger' onClick={onDelete}>Delete</button>
            {invoice.status  === "pending" && (
              <button className='btn btn-primary' onClick={onMarkPaid}>Mark as Paid</button>
            )}
          </div>
        </div>
        
        <div className='detail-card'>
          <h2 style={{fontSize: '16px', marginBottom: '8px'}}>
            <span style={{color: '#7E88C3'}}>#</span>{invoice.id}
          </h2>
          <p style={{fontSize:'12px', color: '#7E88C3'}}>{invoice.description}</p>
          
          <div style={{ marginTop: '32px'}}>
            <p style={{ fontSize: '12px', color: '#7E88C3'}}>Bill To</p>
            <p style={{ fontWeight: '700', marginTop: '8px'}}>{invoice.clientName}</p>
            <p style={{ fontSize: '12px', color:'#7E88C3',  marginTop: '4px'}}>
              {invoice.clientAddress.street}, {invoice.clientAddress.city}
            </p>
            <p style={{ fontSize: '12px', color: '#7E88C3'}}>{invoice.clientEmail}</p>
          </div>
          
          <div style={{ marginTop: '32px'}}>
            <p style={{ fontSize: '12px', color:'#7E88C3'}}>Due date</p>
            <p style={{ fontWeight: '700', marginTop: '8px'}}>{invoice.dueDate}</p>
          </div>
          
          <div className='items-table'>
            <div className='items-table-header'>
              <span>Item Name</span>
              <span>Qty</span>
              <span>Price</span>
              <span>Total</span>
            </div>
            {invoice.items.map((item, index) => (
              <div className='items-table-row' key={index}>
                <span style={{ fontWeight: '700'}}>{item.name}</span>
                <span style={{ color: '#7E88C3'}}>{item.quantity}</span>
                <span style={{ color: '#7E88C3'}}>£{item.price}</span>
                <span style={{ fontWeight: '700'}}>£{(item.quantity  * item.price).toFixed(2)}</span>
              </div>
            ))}
            <div className='items-table-footer'>
              <span>Amount Due</span>
              <span>£{total.toFixed(2)}</span>
            </div>
          </div>
        
        </div>
      </div>
  );
 }

//  APP
function App() {
  const [invoices, setInvoices] = useState(()=> {
    try {
      const saved = localStorage.getItem("invoice-app-data");
      if (saved) return JSON.parse(saved);
    } catch {}
    return  SEED_INVOICES;
  });
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [view, setView] =  useState("list");
  const [theme, setTheme] =  useState(() => {
    return localStorage.getItem("Invoice-theme") || "light";
  });
  const [selectedFilters, setSelectedFilters] = useState(["draft", "pending", "paid"]);
  const [filterOpen,  setFilterOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingInvoice,  setEditingInvoice] =  useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);


  // Handler functions 

  // Open edit form with existing invoice
  const handleEdit = (invoice) => {
    setEditingInvoice(invoice)
  };

  // Close edit form
  const handleCloseEdit = ()=> {
    setEditingInvoice(null);
  };

  // Save edited invoice - replace existing one in array
  const handleSaveEdit = (updatedInvoice) =>  {
    setInvoices(prev => prev.map(inv => inv.id  === updatedInvoice.id  ?  updatedInvoice : inv));
    setSelectedInvoice(updatedInvoice);
    setEditingInvoice(null);
  };
  // Open delete modal
  const handleDeleteClick = (invoice) => {
    setInvoiceToDelete(invoice);
    setShowDeleteModal(true);
  };
  // Confirm delete- remove from array and go back to list 
  const handleConfirmDelete = ()=> {
    setInvoices(prev => prev.filter(inv => inv.id !==  invoiceToDelete.id));
    setShowDeleteModal(false);
    setInvoiceToDelete(null);
    setSelectedInvoice(null);
    setView("list");
  };

  // Mark invoice as paid
  const handleMarkPaid = (invoice) => {
    setInvoices(prev => prev.map(inv => inv.id  === invoice.id ? {...inv, status: "paid"} : inv));
    setSelectedInvoice({...invoice, status: "paid"});
  };
 
  // When a card is clicked, save  the invoice AND switch view
  const handleSelectInvoice= (invoice) => {
    setSelectedInvoice(invoice);
    setView("detail");
  };

  // When Back is clicked,  clear selction  AND switch view back
  const handleBack = () => {
    setSelectedInvoice(null);
    setView("list");
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("Invoice-theme", theme);
  }, [theme]);
  // Save invoices  toLocalStorage whenever array change
  useEffect(()=> {
    localStorage.setItem("invoice-app-data", JSON.stringify(invoices));
  }, [invoices]);
   

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  };

  const toggleFilter = (status) => {
    setSelectedFilters(prev => 
      prev.includes(status) 
      ? prev.filter(s => s !== status) : [...prev, status]
  );
  };

  const handleSaveInvoice = (newInvoice) => {
    setInvoices(prev => [newInvoice, ...prev]);
    setShowForm(false);
  }

  const filteredInvoices = invoices.filter(invoice => 
    selectedFilters.includes(invoice.status)
  );

  return (
    <div className='app-layout'>
      <div style={{width: '100%'}}>
        <nav className='sidebar'>
          <div className='sidebar-logo'>
            <div className='logo-icon'>
              <svg width="28" height="26" viewBox='0 0 28 26' fill='none'>
                <path d='M0 20L8 4l8 16H0z' fill='white'/>
                <path d="M12 26L20 10l8 16H12z" fill='white' fillOpacity="0.5"/>
              </svg>
            </div>
          </div>
          {/* bOTTOM CONTROLS */}
          <div className='sidebar-bottom'>
            <button className='btn-icon' onClick={toggleTheme} aria-label='Toggle theme'>
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <div className='sidebar-divider'/>
            <div className='sidebar-avatar'>JH</div>
          </div>
        </nav>

        <div className='main-content'>  
        {/* this closing tags are might to be under dont forget  */}

      {/*Show list only when view is list */}
        {view ==="list" && (
          <div>
            <div className='list-header'>
              <div>
                <h2>Invoices</h2>
                <p>There are {filteredInvoices.length} total invoices</p>
              </div>
              <div style={{display: "flex", alignItems: "center", gap: "16px"}}>
                <FilterDropdown
                   selectedFilters={selectedFilters}
                  onToggle={toggleFilter}
                  isOpen={filterOpen}
                  onToggleOpen={()=>setFilterOpen(o => !o)}
                />
                <button className='btn btn-primary' onClick={()=> setShowForm(true)}>
                  + New Invoice
                </button>
              </div>
            </div>
            
            {filteredInvoices.map((invoice) => (
              <InvoiceCard 
              key={invoice.id} 
              id={invoice.id}
              clientName={invoice.clientName}
              status={invoice.status}
              dueDate={invoice.dueDate}
              amount={calcTotal(invoice.items).toFixed(2)}
              onClick={()=> handleSelectInvoice(invoice)}
              />
             ))}

             {filteredInvoices.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "80px 24px",
            color: "var(--muted)"
          }}>
            <p style={{fontSize: "20px", fontWeight: "700",
              color: "var(--text)", marginBottom: "16px"}}>
                Nothing here
              </p>
              <p style={{fontSize: "12px", lineHeight: "1.8"}}>
                No invoices match the  selected filter.
              </p>
          </div>
         )}

          </div> 
         )}

        {/* Show the detail only is detail AND an invoice is selected */}
      
          {view  === "detail" && selectedInvoice && (
          <InvoiceDetail
            invoice={selectedInvoice}
            onBack={handleBack}
            onEdit={()=> handleEdit(selectedInvoice)}
            onDelete={()=> handleDeleteClick(selectedInvoice)}
            onMarkPaid={()=> handleMarkPaid(selectedInvoice)}
          />
          )}

           {(showForm || editingInvoice)&& (
            <InvoiceForm
            invoice={editingInvoice}
            onClose={editingInvoice ? handleCloseEdit : () => setShowForm(false)}
            onSave={editingInvoice  ?  handleSaveEdit : handleSaveInvoice}
            />
          )}
          {showDeleteModal  && invoiceToDelete  && (
            <DeleteModal 
              invoiceId={invoiceToDelete.id}
              onConfirm={handleConfirmDelete}
              onCancel={()=> {
                setShowDeleteModal(false);
                setInvoiceToDelete(null);
              }}
            />
          )}
          </div>
          
        </div>
      </div>
  );

} // App function closes here

export default App;
